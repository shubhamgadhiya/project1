const mongoose2 = require("mongoose");

mongoose2.connect("mongodb://127.0.0.1:27017/form")
.then(()=>{
    console.log("connection is successfully")
}).catch(()=>{
    console.log("connection is failed")
})
module.exports = mongoose2.connection;