import Product from "../models/productModel.js"
import asyncHandler from "express-async-handler"

const getProducts=asyncHandler(async(req,res)=>{
  const pageSize=8
  const page=Number(req.query.pageNumber)||1
  const keyword=req.query.keyword ? {
name:{
  $regex:req.query.keyword,
  $options:"i"
}
  }:{}
  const count=await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize)
    .skip(pageSize*(page-1))
    res.json({products,page,pages:Math.ceil(count/pageSize)});
})

const getProductById=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id);
    if(product){
        res.json(product)
    }else{
        res.status(401)
        throw new Error("product not found")
    }
})

//@desc Del a product
//@route del /api/products/:id
//@access private/Admin
const deleteProduct=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id);
    if(product){
     await product.remove()   
     res.json({message:"product removed"})
    }else{
        res.status(401)
        throw new Error("product not found")
    }
})


//@desc create a product
//@route post /api/products/
//@access private/Admin
const createProduct=asyncHandler(async(req,res)=>{
   const product=new Product({
       name:"sample name",
       price:0,
       user:req.user._id,
       image:"/images/sample.jpg",
       brand:"Sample brand",
       category:"Sample Category",
       countInStock:5,
       numReviews:0,
       description:"sample desc"

   })
   const createdProduct=await product.save()
   res.status(201).json(createdProduct)
})


//@desc update a product
//@route put /api/products/:id
//@access private/Admin
const updateProduct=asyncHandler(async(req,res)=>{
    
 const {name,price,description,
    image,brand,category,countInStock}=req.body      
 
    const product=await Product.findById(req.params.id)
if(product){
product.name=name
product.price=price
product.description=description
product.image=image
product.category=category
product.brand=brand
product.countInStock=countInStock

const updatedProduct=await product.save()
res.json(updatedProduct)
}else{
    res.status(404)
    throw new Error("Product not found")
}
 })

 // @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
  
    const product = await Product.findById(req.params.id)
  
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      )
  
      if (alreadyReviewed) {
        res.status(400)
        throw new Error('Product already reviewed')
      }
  
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }
  
      product.reviews.push(review)
  
      product.numReviews = product.reviews.length
  
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length
  
      await product.save()
      res.status(201).json({ message: 'Review added' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })


// @desc    Get top rated products
// @route   get /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
 const products=await Product.find({}).sort({rating:-1})
 .limit(3)
 res.json(products)
})

export {getProducts,getProductById,deleteProduct,
createProduct,updateProduct,createProductReview,
getTopProducts}