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
        })
    }
}
)


// app.post("/api/add_product", (req,res)=>{
//     console.log("Result", req.body);
//     const pdata = {
//         "id": productData.length+1,
//         "pname": req.body.pname,
//         "pprice": req.body.pprice,
//         "pdesc": req.body.pdesc,
//     };

//     productData.push(pdata);
//     console.log("Final", pdata);

//     res.status(200).send({
//         "status_code": 200,
//         "message": "Product added successfully",
//         "product": pdata
//     });
// })

app.get("/api/get_product", (req,res) => {
    if(productData.length >0){
        res.status(200).send({
            'status_code': 200,
            'products': productData
        });
    } else {
       res.status(200).send({
        'status_code': 200,
        'products': []
       }); 
    }
})

app.put("/api/update/:id", (req,res) => {
    let id = req.params.id *1;
    let productToUpdate = productData.find(p=>p.id === id);
    let index = productData.indexOf(productToUpdate);

    productData[index] = req.body;

    res.status(200).send({
        'status': "succes",
        'message': "Product Updated"
    })
})

app.post("/api/delete/:id", (req,res) => {
    let id = req.params.id *1;
    let productToUpdate = productData.find(p=>p.id === id);
    let index = productData.indexOf(productToUpdate);

    productData.splice(index,1);

    res.status(204).send({
        'status': "succes",
        'message': "Product Deleted"
    })
})

