const mongoose1 = require("mongoose");

mongoose1.connect("mongodb://127.0.0.1:27017/jwt")
.then(()=>{
    console.log("connection is successfully")
}).catch(()=>{
    console.log("connection is failed")
})
module.exports = mongoose1.connection;