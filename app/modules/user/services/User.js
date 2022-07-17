const User = {};

User.save = async(data) => {
    try{
        return Models.User.create(data);
    } catch (err) {
        throw(err.message);
    }
}

User.findOne = (params = {}) => {
    try{
        const { condition = {}, projection = {}, options = {} } = params;
        return Models.User.findOne(condition, projection, options);
    } catch (err) {
        throw(err.message);
    }
}

User.register = async (params) => {
    try{
        const { email } = params;
        let isEmailExist = await User.findOne({condition: {email: email}});
        if(isEmailExist){
            throw "email already Exist";
        }
        const user = User.save(params);
        return user;
    } catch (err) {
        throw err;
    }
}

User.login = async (params) => {
    try{   
        const { email, password } = params;
        let user = await User.findOne({condition: {email: email}});
        if(!user){
            throw "email not Register";
        }
        let same = await bcrypt.compareSync(password, user.password);
        if (!same) {
            return "password not match";
        } else {
            return "Login successfully";
        }
    } catch (err) {
        throw err;
    }
}

User.getUser = (params) => {
    try{ 
        const user = User.findOne({_id: ObjectId(params.id)});
        return user;
    } catch (err) {
        throw err;
    }
}

module.exports = User;