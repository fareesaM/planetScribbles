import React,{useState,useEffect} from 'react'
import {LinkContainer} from "react-router-bootstrap"
import {Table,Button,Row,Col} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import Paginate from "../components/Paginate"
import {listProducts,deleteProduct,
createProduct} from "../actions/productActions"
import {PRODUCT_CREATE_RESET} from "../constants/productCons"

const ProductListScreen = ({history,match}) => {
    const pageNumber=match.params.pageNumber || 1
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo}=userLogin

const productList = useSelector(state => state.productList)
const {loading,error,products,page,pages}=productList

const productDelete = useSelector(state => state.productDelete)
const {loading:loadingDelete,error:errorDelete,success:successDelete}=productDelete

const productCreate = useSelector(state => state.productCreate)
const {loading:loadingCreate,error:errorCreate,success:successCreate,product:createdProduct}=productCreate



const deleteHandler=(id)=>{
    if(window.confirm("Are you sure")){
     dispatch(deleteProduct(id))  
    }
   
}

const createProductHandler=()=>{
dispatch(createProduct())
}

useEffect(() => {

 dispatch({type:PRODUCT_CREATE_RESET})
    if(!userInfo.isAdmin){
        history.push("/login")
           }
    if(successCreate){
        console.log(createdProduct);
        history.push(`/admin/product/${createdProduct._id}/edit`)
    }else{
        dispatch(listProducts("",pageNumber))
    }
    
}, [dispatch,history,userInfo,successDelete,successCreate,
createdProduct,pageNumber])

    return (
        <>
        <Row className="align items-center">
<Col>
 <h1>products</h1>   
</Col>
<Col className="text-right">
<Button className="my-3" onClick={createProductHandler} variant="dark">
   <i className="fas fa-plus"></i> Create Product 
</Button>
</Col>
        </Row>
        {loadingCreate&&<Loader />}
{errorCreate && <Message variant="danger">{error}</Message>}       
{loadingDelete&&<Loader />}
{errorDelete && <Message variant="danger">{error}</Message>}
  {loading?<Loader />:error?<Message variant="danger">{error}</Message>:(
  <>
   <Table striped border hover responsive className="table-sm">
<thead>
    <tr>
        <th>ID</th>
        <th>NAME</th>
        <th>PRICE</th>
        <th>CATEGORY</th>
        <th>BRAND</th>
    </tr>
</thead>
<tbody>
{products.map(product=>(
   <tr key={product._id}>
<td>{product._id}</td>
<td>{product.name}</td>
<td>${product.price}</td>
<td>{product.category}</td>
<td>{product.brand}</td>
<td>
    <LinkContainer to={`/admin/product/${product._id}/edit`}>
<Button variant="light" className="btn-sm">
    <i className="fas fa-edit"></i>
</Button>
    </LinkContainer>
    <Button variant="danger" className="btn-sm" onClick={()=>deleteHandler(product._id)}>
    <i className="fas fa-trash"></i>   
    </Button>
</td>
   </tr> 
))}
</tbody>
        </Table>
   <Paginate pages={pages} page={page} isAdmin={true} />      
        </>)}
            
        </>
  )
}

export default ProductListScreen

