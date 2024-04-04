const express = require("express");
const mongoose = require("mongoose");

const vendorschema = new mongoose.Schema({
    Name: {type: String},
  UserId: { type: String },
  Password: { type: String }
});

const userschema = new mongoose.Schema({
    Name: {type: String},
    UserId: { type: String },
    Password: { type: String }
});

const adminschema = new mongoose.Schema({
    Name: {type: String},
    UserId: { type: String },
    Password: { type: String }
});


const productschema = new mongoose.Schema({
  ProductName: {type: String},
  ProductPrice: { type: String },
});




const VendorModel = mongoose.model("vendors", vendorschema);
const UserModel = mongoose.model("users", userschema);
const AdminModel = mongoose.model("admins", adminschema);
const ProductModel = mongoose.model("products", productschema);

const addProductToMongoose = async (data) => {
  try {
    var new_product = new ProductModel({
      ProductName: data.ProductName,
      ProductPrice: data.ProductPrice
    });
    await new_product.save();
  } catch (error) {
    console.log(error);
  }
};

const addVendorToMongoose = async (data) => {
  try {
    var new_registration = new VendorModel({
      Name:data.Name,
      UserId: data.UserId,
      Password: data.Password
    });
    await new_registration.save();
  } catch (error) {
    console.log(error);
  }
};

const addAdminToMongoose = async (data) => {
    try {
      var new_registration = new AdminModel({
        Name:data.Name,
        UserId: data.UserId,
        Password: data.Password
      });
      await new_registration.save();
    } catch (error) {
      console.log(error);
    }
};

const addUserToMongoose = async (data) => {
    try {
      var new_registration = new UserModel({
        Name:data.Name,
        UserId: data.UserId,
        Password: data.Password
      });
      await new_registration.save();
    } catch (error) {
      console.log(error);
    }
};
  

const findAdminbyQuery = async (query) => {
  try {
    const adminwithgivenQuery = await AdminModel.findOne(query)
    if (adminwithgivenQuery) {
      console.log("for query ", query, " User Id is ", adminwithgivenQuery.UserId," pass is: ",adminwithgivenQuery.Password);
      return adminwithgivenQuery;
    } else {
      console.log(query, "is not a registered admin");
    }
  } catch (error) {
    console.log(error)

  }
}

const findUserbyQuery = async (query) => {
    try {
      const userwithgivenQuery = await UserModel.findOne(query)
      if (userwithgivenQuery) {
        console.log("for query ", query, " User Id is ", userwithgivenQuery.UserId," pass is: ",userwithgivenQuery.Password);
        return userwithgivenQuery;
      } else {
        console.log(query, "is not a registered user");
      }
    } catch (error) {
      console.log(error)
  
    }
  }

  const findVendorbyQuery = async (query) => {
    try {
      const vendorwithgivenQuery = await VendorModel.findOne(query)
      if (vendorwithgivenQuery) {
        console.log("for query ", query, " User Id is ", vendorwithgivenQuery.UserId," pass is: ",vendorwithgivenQuery.Password);
        return vendorwithgivenQuery;
      } else {
        console.log(query, "is not a registered vendor");
      }
    } catch (error) {
      console.log(error)
  
    }
  }

  const findProductbyQuery = async (query) => {
    try {
      const vendorwithgivenQuery = await ProductModel.findOne(query)
      if (productwithgivenQuery) {
        return productwithgivenQuerywithgivenQuery;
      } else {
        console.log(query, "is not added in the product list");
      }
    } catch (error) {
      console.log(error)
  
    }
  }





module.exports = {
    findVendorbyQuery,
    findUserbyQuery,
    findAdminbyQuery,
    addAdminToMongoose,
    addVendorToMongoose,
    addUserToMongoose,
    addProductToMongoose,
    findProductbyQuery,
};