import mongoose, { Mongoose } from "mongoose";
import jwt from "jsonwebtoken";
import { decrypt } from "dotenv";

const userSchema = new mongoose.Schema({

    fullname:{

        firstname:{
            type: String,
            require: true
        },
        lastname:{
            type:String,
        }

    },

    email:{
        type: String,
        require: true,
        unique: true 
    },

    password:{
        type:String,
        require:true,
        select:false
    },

    socketId:{
        type:String,
    }

})


userSchema.method.generateAuthToken = ()=>{
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRETE,{expiresIn:'24h'});
    return token
}


userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


userSchema.static.hashpassword =async function (password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user',userSchema)


export default userModel