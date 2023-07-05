import express from 'express';
import User from '../models/userModel.js';

const userRouter = express.Router();

userRouter.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: 'admin',
      id: 'idtest',
      password: 'pwtest',
    });
    const createUser = await user.save();
    res.send(createUser);
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
});

userRouter.post(    
    '/signin',
    expressAsyncHandler(async(req, res) => {  
        const signinUser = await User.findOne({
            id: req.body.id,
            password: req.body.password,
        });
        if(!signinUser){
            res.status(401).send({
                message: 'Invalid id or Password'
            })
        }else{
            res.send({
                _id: signinUser._id,
                name: signinUser.name,
                id: signinUser.id,
                isAdmin: signinUser.isAdmin,
                token: generateToken(signinUser),
            })
        }
    }) //expressHandler End
);


export default userRouter;
