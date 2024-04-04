const express = require('express')
const {
    findVendorbyQuery,
    findUserbyQuery,
    findAdminbyQuery,
    addAdminToMongoose,
    addVendorToMongoose,
    addUserToMongoose,
} = require('./Model/db');


userRouter = express.Router();


userRouter.post('/logAsVendor', async (req, res) => {
    try {
      // Check if the user exists
      const user = await findVendorbyQuery({ UserId: req.body.UserId });
      console.log(user); // For debugging purposes, can be commented out in production
      if (!user) {
        return res.status(404).json("Vendor not found");
      }
  
      // Compare the provided password with the password in the database
      const pass = user.Password;
      if(pass===req.body.Password){
        res.status(200).json(user);
      }
    } catch (error) {
      console.error(error); // Log the complete error for debugging
      res.status(500).json({ message: 'Internal server error during login' });
    }
  });
  

userRouter.get('/logAsUser', async (req, res) => {
    try {
        const query = req.body;
        const queryObj = { "UserRefrralCode": query };
        let studentbyQuery = await findbyQueryMongoose(queryObj);
        if (studentbyQuery) {
            res.status(200).send({ "Code": studentbyQuery.UserRefrralCode, "ReferredBy": studentbyQuery.FirstName + " " + studentbyQuery.LastName });
        } else {
            res.status(404).send("This is not a valid referral code");
            console.log("Invalid referral Code Applied")
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error while getting query details")

    }

})

userRouter.get('/logAsAdmin', async (req, res) => {
    try {
        const query = req.body;
        const queryObj = { "UserRefrralCode": query };
        let studentbyQuery = await findbyQueryMongoose(queryObj);
        if (studentbyQuery) {
            res.status(200).send({ "Code": studentbyQuery.UserRefrralCode, "ReferredBy": studentbyQuery.FirstName + " " + studentbyQuery.LastName });
        } else {
            res.status(404).send("This is not a valid ");
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error while getting student query details")

    }

})


userRouter.post('/SignUpAsAdmin/', (req, res) => {
    try {
        addToMongoose(req.body);
        res.status(200).send("New Admin register request has been sent");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while registering new Admin");
    }
})

userRouter.post('/SignUpAsUser/', (req, res) => {
    try {
        addToMongoose(req.body);
        res.status(200).send("New User register request has been sent");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while registering new User");
    }
})


userRouter.post('/SignUpAsVendor', async (req, res) => {
    try {
        // Check if the user exists
        const user = await findVendorbyQuery({ UserId: req.body.UserId });
        if (!user) {
            await addVendorToMongoose(req.body);
            res.status(200).send("New Vendor register request has been sent");
        }
        else {
            res.json("Username already exists");
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error while getting student query details")
    }
})


module.exports = { userRouter }