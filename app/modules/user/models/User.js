const saltRounds = 10;
const UserSchema = Mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    role: String,
    status: String
},{
    timestamps: true,
    toObject: {
        virtuals: true,
        getters: true
    },
    toJSON: {
        virtuals: true,
        getters: true
    }
})

UserSchema.post('init', function() {
    this._original = this.toObject();
});

UserSchema.pre('save', function(next) {
    if (this.password) {
        const document = this;
        bcrypt.hash(this.password, saltRounds, function(err, hashedPassword) {
            if (err) {
                next(err);
            } else {
                document.password = hashedPassword;
                next();
            }
        });
    } else {
        next();
    }
})
let UserModel = Mongoose.model('users', UserSchema)
module.exports = UserModel;