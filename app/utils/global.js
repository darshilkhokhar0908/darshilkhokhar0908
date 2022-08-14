global.Services = require('../load-services');
global.Models = require('../load-models');
global.bcrypt = require('bcryptjs');
global.Auth = require("../middleware/auth");
global.setError = (msg, code) => {
    if (!code) {
        code = 400;
    }
    let err = new Error(msg);
    err.status = code;
    return err;
};
global.throwError = (err,code=400) => {
    if(typeof err === 'string'){
        throw setError(err,code);
    }else{
        throw err;
    }
};