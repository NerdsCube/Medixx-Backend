const mongoose = require("mongoose");

const signupModel = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    weight: { type: Number },
    height: { type: Number },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    id: { type: String }
});

module.exports = mongoose.model("Medicx", signupModel);