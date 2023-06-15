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

//Main Page = Hello World
app.get('/', (req,res)=>{
    res.send('Hello World');
})

//Add Product Api
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
})

//Get Product Api
app.get("/api/get_product", async (req,res) => {

    try{
        let data = await Product.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            'status': error.message
        })
    }
})

//Update Product Api
app.patch("/api/update/:id", async (req,res) => {
    let id = req.params.id;
    let updateData = req.body;
    let options = {new: true};

    try{

        const data = await Product.findByIdAndUpdate(id,updateData, options);
        res.send(data);

    } catch (error) {

        res.send(error.message);

    }
})

//Delete Product Api
app.delete("/api/delete/:id", async (req,res) => {
    let id = req.params.id;

    try{

        const data = await Product.findByIdAndDelete(id);
        res.status(204).json({'status': "Deleted the product ${data.pname} from database"});
        res.send(data);

    } catch (error) {

        res.json(error.message);

    }
})