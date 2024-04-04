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
        console.log(user);
        if (!user) {
            return res.status(404).json("notexist");
        }
        else {
            const pass = user.Password;

            // Compare the provided password with the password in the database
            if (!password == pass) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error while getting student query details")

    }
})


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
        res.status(500).send("Internal server error while getting student query details")

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
            res.status(404).send("This is not a valid referral code");
            console.log("Invalid referral Code Applied")
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