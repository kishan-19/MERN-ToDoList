const express = require('express');
const router = express.Router();
const user = require('../models/registrationSchema');
const validate = require('../middlewares/validate-middleware');
const { signupSchema, loginSchema } = require('../validators/auth-validator');
const fetchUser = require('../middlewares/fetchUser');

// *-------------------
// user Registration
// *-------------------

router.post('/register', validate(signupSchema), async (req, res, next) => {
    try {
        // console.log(req.body);
        const { username, email, phone, password } = req.body;
        const userExite = await user.findOne({ email: email });
        if (userExite) {
            return res.status(400).json({ msg: "user already registered" });
        }
        const userCreated = await user.create({ username, email, phone, password });
        res.status(201).json({ msg: 'registration successful', token: await userCreated.generateToken(), userId: userCreated._id.toString() });
    } catch (error) {
        next(error);
    }

})

// *-------------------
// user Logic
// *-------------------

router.post('/login', validate(loginSchema), async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await user.findOne({ email })

        if (!userExist) {
            return res.status(400).json({ message: 'invalid credentials' });
        }

        const isPasswordValid = await userExist.comparePassword(password);

        if (isPasswordValid) {
            res.status(200).json({
                message: "Login successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
                // userName: userExist.username,
            })
        } else {
            res.status(401).json({ message: "invalid Email and Password" });
        }
    } catch (error) {
        next(error)
    }
});

// *-------------------
// get login user 
// *-------------------

router.get('/loginuser',fetchUser,async(req,res,next)=>{
   try {
    const loginUser = await user.find({ _id: req.user.userId });
      const loginUserDeltail = loginUser[0]
    res.status(200).json(loginUserDeltail);
   } catch (error) {
    next(error);
    
   }
})

// *-------------------
// get all user for admin
// *-------------------
router.get('/user',async(req,res,next)=>{
    try {
         const userData = await user.find();
         res.status(200).json(userData);
    } catch (error) {
        next(error);
    }
});
// *-------------------
// Delete user 
// *-------------------
router.delete('/deleteuser/:id',async(req,res,next)=>{
    try {
        const id = req.params.id;
         const deleteUserData = await user.findByIdAndDelete(id);
         if(deleteUserData.deletedCount == 0){
            res.status(401).json({msg:"can't delete user"});
         }else {
         res.status(200).json({msg:"sucessfully deleted"});
         }
    } catch (error) {
        next(error);
    }
});

module.exports = router;