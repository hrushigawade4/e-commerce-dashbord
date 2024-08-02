import React, { useEffect } from "react";
import {useParams , useNavigate} from 'react-router-dom'

const UpdateProduct=()=>{

    const [name,setName]=React.useState('');
    const [price,setPrice]=React.useState('');
    const [category,setCategory]=React.useState('');
    const [company,setCompany]=React.useState('');
    const params = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        getProductDetails()
    },[])

    const getProductDetails = async()=>{
       
        
        let result = await fetch(`http://localhost:5000/product/${params.id}`)
        result = await result.json();
       
        setPrice(result.price)
        setName(result.name)
        setCategory(result.category)
        setCompany(result.company)
        

    }


    const updateProduct = async()=>{

       console.warn(name,price,company,category);
       let result = await fetch(`http://localhost:5000/product/${params.id}`,{
        method:'Put',
        body:JSON.stringify({name,price,company,category}),
        headers:{
            'Content-Type':'Application/json'
        }
       })
       result = await result.json()
        if(result){
        navigate('/')
        }
        

      
    }




    return(
        <div className="product">
            <h1>Update Product</h1>
            <input className="inputBox" type="text" placeholder="Enter product name" value={name} onChange={(e)=>{setName(e.target.value)}} />
          
            <input className="inputBox" type="text" placeholder="Enter price name" value={price} onChange={(e)=>{setPrice(e.target.value)}} />
            
            <input className="inputBox" type="text" placeholder="Enter category name" value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
            
            <input className="inputBox" type="text" placeholder="Enter company name" value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
            
            <button className="appButton" onClick={updateProduct}>Update Product</button>
        </div>
    )
}

export default UpdateProduct