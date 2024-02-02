import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String},
    password: {type: String},
    email: {type: String}
});

const monuments = new mongoose.Schema({
    title: {type: String},
    bannerImg: {type: String},
    description: {type: String},
    city: {type: String},
    address: {type: String},
    otherThings: {type: String},
    contributor: {type: String},
    contributorId: {type: String},
    images: {type: Array}
});

const contributions = new mongoose.Schema({

    monumentId: {type: String},
    contributor: {type: String},
    contributorId: {type: String},
    title: {type: String},
    city: {type: String},
    address: {type: String},
    contribution: {type: String},
    date: {type: String}
});

const cities = new mongoose.Schema({
    name: {type: String},
    bannerImg: {type: String}
});


export const User = mongoose.model("users", userSchema);
export const Monument = mongoose.model("monuments", monuments);
export const Contribution = mongoose.model("contributions", contributions);
export const City = mongoose.model("cities", cities);