var express = require('express');
var router = express.Router();

const register = async (req, res, next) => {
    try {
        await Services.User.adminReg(req.body);
        return res.send({message: "Admin User successfully register"});
    } catch (err) {
        return next(err);
    }
}

const login = async (req, res, next) => {
    try {
        let user = await Services.User.login(req.body);
        return res.send({message: user});
    } catch (err) {
        return next(err);
    }
}

const getUser = async (req, res, next) => {
    try{
        const user = await Services.User.getUser(req.params);
        return res.send({data: user, message: "user successfully fetched"})
    } catch (err) {
        return next(err);
    }
}
router.post('/', register);
router.post('/login', login);
router.get('/:id', getUser);

module.exports = router;
