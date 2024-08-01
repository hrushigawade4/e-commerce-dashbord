const express = require("express");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product")
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  console.log(result);
  result=result.toObject();
  delete result.password
  res.send(result);
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No user found!!!" });
    }
  } else {
    res.send({ result: "No user found!!!" });
  }
});


app.post('/add-product', async(req,res)=>{
  
    let product= new Product(req.body);
    let result = await product.save();
    res.send(result);
})

app.get('/products',async(req,res)=>{
  let products = await Product.find({})
  console.warn(products.length);
  if(products.length > 0){
    res.send(products)
  }else{
    res.send({result:"No Product Found"})
  }
  
})


app.listen(5000);
