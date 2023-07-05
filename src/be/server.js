import express from 'express';
import data from './data.js';
import cors from 'cors';
import mongoose from 'mongoose';
import config from'./config.js'

const app = express();

app.use(cors());
app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.listen(5000, () => {
  console.log("server at http://localhost:5000");
});

dbMain()
.then(()=>{
    console.log("conneted to mongodb!")
})
.catch(err=>console.log(err));

async function dbMain() {
    await mongoose.connect(config.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}