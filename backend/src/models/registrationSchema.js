const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registrationSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

registrationSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified("password")) {
        return next();
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, saltRound);
        user.password = hashPassword;
    } catch (error) {
        return next(error);
    }
})

// jsonwebtoken
registrationSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            username: this.username,
            isAdmin: this.isAdmin,
        },
            process.env.JWT_SECRET_KEY, {
            expiresIn: "30d",
        });
    } catch (error) {
        console.error(error);
    }
};

// comparePassword

registrationSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password,this.password);
};


const registrationModel = new mongoose.model("User", registrationSchema);

module.exports = registrationModel;