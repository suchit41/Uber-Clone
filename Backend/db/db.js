
import mongoose from "mongoose";


export default ConnectToDB = async function (){

    const connect = mongoose.connect(process.env.DB_CONNECT
    ).then(() => {
        console.log('Connected to DB');
    }).catch(err => console.log(err));
}


