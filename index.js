const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Product = require("./product");

app.use(express.json());
app.use(express.urlencoded(
    {extended: true}
));

const productData = [];

const port = process.env.PORT || 2000;
app.listen(port, ()=>{
    console.log(`Connected to server at ${port}`);
});



mongoose.set('strictQuery',true);
mongoose.connect("mongodb+srv://mailmaul:Maul123@mauldev.834ppjk.mongodb.net/flutter",
(error) => {
    if(!error){
        console.log("Status", "Connected to mongoose")
    } else {
        console.log(error.message);
    }
}
)

app.get('/', (req,res)=>{
    res.send('Hello World');
    })

app.post("/api/add_product", async (req,res) => {
    console.log("Result", req.body);

    let data = Product(req.body);

    try{
        let dataToStore = await data.save();
        res.status(200).json(dataToStore);
    } catch (error) {
        res.status(400).json({
            'status': error.message
        })
    }

    app.use((req, res) => {
        res.status(404).send("Not Found");
      });
})

app.get("/api/get_product", async (req,res) => {

    try{
        let data = await Product.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            'status': error.message
        })
    }

    app.use((req, res) => {
        res.status(404).send("Not Found");
      });
})