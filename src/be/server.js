import express from 'express';
import data from './data.js';
import cors from 'cors';
import mongoose from 'mongoose';
import config from'./config.js'
import userRouter from './routers/userRouter.js';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use('/api/users', userRouter);
app.use(bodyParser.json());
app.get('/api/products', (req, res) => {
  res.send(data.products);
});

dbMain()
.then(()=>{
    console.log("conneted to mongodb!")
    console.log(`MongodbURL : ${config.MONGODB_URL}`);
})
.catch(err=>console.log(err));

async function dbMain() {
    await mongoose.connect(config.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

app.use((err,req,res,next)=>{
  const status = err.name && err.name === 'ValidationError'?400:500;
  res.status(status).send({message:err.message});
})


app.listen(5000, () => {
  console.log("server at http://localhost:5000");
});

