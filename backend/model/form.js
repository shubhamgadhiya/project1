const mongoose2 = require('mongoose');
const conn2 = require("../db/conn2");

const formSchema = new mongoose2.Schema({
    
    username:{
        type: String,
        require: true,
        trim: true,
    },
    fname:{
        type: String,
        require: true,
        trim: true
    },
    lname:{
        type: String,
        require: true,
        trim: true
    },
    password:{
        type: Number,
        require: true,
        trim: true
    },
    image:{
        type: String,
        require: true
    },
    dob:{
        type: Date,
        require: true
    },
    mobileno:{
        type: Number,
        require: true,
        trim: true,
       
    },
    countrydata:{
        type: String,
        require: true
    },
    statedata:{
        type: String,
        require: true
    },
    citydata:{
        type: String,
        require: true
    }
    })

    const Form = conn2.model("Form", formSchema)

    module.exports = Form;