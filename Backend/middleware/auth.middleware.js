import blackListTokenModel from "../Model/blackListToken.model.js";
import captainModel from "../Model/captain.model.js";
import userModel from "../Model/user.model.js";


export default authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlackListToken = blackListTokenModel.findOne({ token })

    if (isBlackListToken) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id)

        req.user = user;

        return next();


    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }



}


export default authCaptain = async (req, res, next) => {
    const isBlackListToken = blackListTokenModel.find({ token })

    if (isBlackListToken) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id)

        req.captain = captain;
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

}
