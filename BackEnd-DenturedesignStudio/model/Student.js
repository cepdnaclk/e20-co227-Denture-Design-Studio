const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

const studentschema = new Schema({

    first_name: {
        type: String,
        required : true,
    },
    last_name: {
        type: String,
        required : true,
    },
    email: {
        type: String,
        required : true,
    },
    user_name: {
        type: String,
        required : true,
    },
   
    password: {
        type: String,
        required : true,
    }


})
studentschema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});
studentschema.methods.matchpassword = async function (enterdpassword) {
    return await bcrypt.compare(enterdpassword,this.password);    
}

const Student = mongoose.model("student",studentschema);
module.exports = Student;