import React from "react";

const AddProduct=()=>{

    const [name,setName]=React.useState('');
    const [price,setPrice]=React.useState('');
    const [category,setCategory]=React.useState('');
    const [company,setCompany]=React.useState('');
    const [error,setError]=React.useState(false);


    const addProduct = async()=>{
        if(!name || !price || !category || !company){
            setError(true);
            return false
        }
        console.warn(name,price,category,company);
        const userId =JSON.parse( localStorage.getItem('user'))._id;
        console.warn(userId);
        let result = await fetch('http://localhost:5000/add-product',{
            method:'post',
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
                "Content-type":"application/json"
            }

        })
        result = await result.json();
        console.warn(result);
    }




    return(
        <div className="product">
            <h1>Add Product</h1>
            <input className="inputBox" type="text" placeholder="Enter product name" value={name} onChange={(e)=>{setName(e.target.value)}} />
            {error && !name && <span className="invalid-input">Enter valid name</span>}
            <input className="inputBox" type="text" placeholder="Enter price name" value={price} onChange={(e)=>{setPrice(e.target.value)}} />
            {error && !price && <span className="invalid-input">Enter valid price</span>}
            <input className="inputBox" type="text" placeholder="Enter category name" value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
            {error && !category && <span className="invalid-input">Enter valid category</span>}
            <input className="inputBox" type="text" placeholder="Enter company name" value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
            {error && !company && <span className="invalid-input">Enter valid company</span>}
            <button className="appButton" onClick={addProduct}>Add Product</button>
        </div>
    )
}

export default AddProduct