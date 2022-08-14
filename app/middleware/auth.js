module.exports = {
    check: async (req, res, next) => {
        try {
            const token =
                req.body.token ||
                req.query.token ||
                req.headers['x-access-token'] ||
                req.cookies.token;
            if (!token) {
                throwError("Session Expired. Please Login again");
            } else {
                const decoded = await Services.User.decodeToken(token);
                let user;
                if(decoded){
                    user = await Services.User.findOne({condition:{_id:ObjectId(decoded._id)},projection:{password:0},options:{lean:true}});
                }
                if (user == null) {
                    throwError("user dose not exists");
                }
                else if (
                    user.status === "InActive"
                ) {
                    throwError("Account has been deactivated",403);
                } else {
                    req.user = user;
                    next();
                }
            }
        }catch (e) {
            next(setError(e.message, e.status));
        }
    },    
};
