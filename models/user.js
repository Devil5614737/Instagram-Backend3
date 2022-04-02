const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname:{
 type: String,
    minlength: 5,
    maxlength: 20,
  },
  username: {
    type: String,
    minlength: 5,
    maxlength: 20,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 51,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
  pic: {
    type: String,
    default: "https://images.unsplash.com/photo-1648475949487-79aea73b284b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});


userSchema.methods.generateAuthToken=function(){
  const token=jwt.sign({_id:this._id},process.env.SECRET_KEY)
  return token
}

const User = mongoose.model("User", userSchema);

module.exports = User;
