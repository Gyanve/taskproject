 import react, { useEffect ,useState} from 'react';
import './App.css' ;


const url ="https://dummyjson.com/products/";
const categoryUrl="https://dummyjson.com/products/categories";

function App() {

  const [data,setData]=useState([]);
  const [search,setSearch]=useState('');
   const [searchedProducts,setSearchedProducts]=useState([]);
   const [category,setCategory]=useState([]);
   const [first,setFirst]=useState();
  //  console.log("first",first);
   const [filterData,setFilterData]=useState();
   console.log('res',filterData)
   

  const fetchData=async()=>{
    const result=await fetch(url);
    const res=await result.json();
    setData(res);
    // console.log(res);
  }


useEffect(()=>{
  fetchData();
  filterCategory()
},[]
);



const searchProducts=async()=>{
  const product=await fetch(`https://dummyjson.com/products/search?q=${search}`)
  const  resProducts=await product.json();
  setSearchedProducts(resProducts)
  console.log(resProducts);
}
useEffect(()=>{
  searchProducts()
},[search]);

 const filterCategory=async()=>{
  const categories=await fetch(categoryUrl);
  const resCategories=await categories.json();
  setCategory(resCategories)
  // console.log(resCategories);
 }

 const filterResult=async()=>{
    const result=await fetch(`https://dummyjson.com/products/category/${first}`)
  const response=await result.json();
  console.log(response);
 }


 useEffect(()=>{
  filterResult()
 },[first]);

// const handleChange=(e)=>{
//   console.log(e.target.value);
//   setFirst(e.target.value)
// }

  return (
    <div>
      <div className='root'>
        <h4>Products List ...</h4>
      
    <div className='nav'>
    
  
    <input type='text' value={search}  onChange={(e)=>setSearch(e.target.value)} 
    className='input' placeholder='Search'/>
    
      <select className='select'> 
       <option>Please choose category</option>
       {
        category?.map((cat,index)=>{
          return(
            <option key={index} onClick={()=>setFirst(cat)} >
              {cat}
            </option>
          )
          })
       }
      </select>
    </div>
    </div>
     
    <table class="table">
        <tr>
          <th>S.NO</th>
          <th>Category</th>
          <th>Title</th>
          <th>Price..</th>
          <th>Description</th>
        </tr>

       {
        searchedProducts.products?.map((item)=>{
          // console.log("item",item);
          return(
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.category}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td >{item.description}</td>
           
              </tr>
          )
        })
      } 


        






      </table>
   </div>
  );
}

export default App;


