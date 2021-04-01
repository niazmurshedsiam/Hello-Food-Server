const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
console.log(process.env.DB_USER);

app.get('/', (req, res) => {
  res.send('Book House')
})
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bm8mo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log('connection err', err);
  const ProductsCollection = client.db("freshValley").collection("products");
  console.log('Database connection successfully');
//   client.close();
app.post('/addProduct',(req,res)=>{
  const newProduct = req.body;
  console.log('adding new event: ',newProduct);
  ProductsCollection.insertOne(newProduct)
  .then(result=>{
    console.log('Inserted Count',result.insertedCount);
    res.send(result.insertedCount > 0)
  })
})
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})