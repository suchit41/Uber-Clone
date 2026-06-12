import { decrypt } from "dotenv";
import mongoose from "mongoose";


const captainSchema = mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            require: true
        },
        lastname: {
            typpe: String,
        }
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },

    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long'],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate must be at least 3 characters long'],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto'],
        }
    },

    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }

})





captainSchema.method.generateAuthToken = ()=>{
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRETE, { expiresIn: '24h'});
}


captainSchema.method.comparePassword = async (password) =>{
    return await bcrypt.compare(password,this.password);
}

captainSchema.static.hashpassword = async (password) =>{
    return await bcrypt.hash(password, 10);
}


const captainModel = mongoose.model('captain', captainSchema); 

export default captainModel;