const jwt = require('jsonwebtoken');
const secret = Config.App.secret;
const tokenExpiresTime = Config.App.tokenExpiresTime;
const User = {};

User.save = async(data) => {
    try{
        return Models.User.create(data);
    } catch (err) {
        throwError(err.message);
    }
}

User.findOne = async (params = {}) => {
    try{
        const { condition = {}, projection = {}, options = {} } = params;
        return Models.User.findOne(condition, projection, options);
    } catch (err) {
        throwError(err.message);
    }
}

User.update = async(data, info) => {
    try{
        Object.assign(data, info);
        return await data.save();
    } catch (err) {
        throwError(err.message);
    }
}

User.register = async (data) => {
    try{
        const { email } = data;
        let isEmailExist = await User.findOne({condition: {email: email}});
        if(isEmailExist){
            throwError("email already Exist");
        }
        data.role = "user";
        data.status = "Active";
        data.name = data.firstName + data.lastName;
        const user = await User.save(data);
        return user;
    } catch (err) {
        throwError(err);
    }
}

User.login = async (data) => {
    try{   
        const { email, password } = data;
        let user = await User.findOne({condition: {email: email}});
        let payload = { email: user.email, _id: user._id, name: user.name}
        if(!user){
            throwError("email not Register");
        }
        let same = await bcrypt.compareSync(password, user.password);
        if (!same) {
            return "password not match";
        } else {
            let token = User.getToken(payload);
            return ({token: token, message: "Login successfully"});
        }
    } catch (err) {
        throwError(err);
    }
}

User.resetPassword = async (data) => {
    try{
        const { email, password, newPassword, confirmPassword } = data;
        let user = await User.findOne({condition: {email: email}});
        if(!user){
            throwError("email not Register");
        }
        let same = await bcrypt.compareSync(password, user.password);
        if (!same) {
            throwError("current password is not match");
        }
        if(newPassword !== confirmPassword){
            throwError("new Password and confirm password are not match");
        }
        let update = {};
        update.password = newPassword;
        let updateuser = await User.update(user, update);
        if(updateuser){
            return "Password Successfully Changed";
        }
    } catch (err) {
        throwError(err);
    }
}

User.getToken = (user) => {
    return jwt.sign(user, secret, {
        expiresIn: tokenExpiresTime
    });
};

User.decodeToken = async (token) => {
    try{
        return await jwt.verify(token, secret);
    }catch(err){
        throwError("Failed to authenticate token.",403);
    }    
};

/* admin services start */
User.adminReg = async (params) => {
    try{
        const { email } = params;
        let isEmailExist = await User.findOne({condition: {email: email}});
        if(isEmailExist){
            throwError("email already Exist");
        }
        params.role = "admin";
        params.status = "Active";
        const user = await User.save(params);
        return user;
    } catch (err) {
        throwError(err);
    }
}
/* admin services end */

module.exports = User;