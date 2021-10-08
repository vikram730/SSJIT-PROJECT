require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const teachersDoc = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    profile: {
        type: String,
        required: true
    },
    idProof: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        required: true
    },
    subjectsOfInterest: {
        type: String,
        required: true
    },
    selectedModeOfTeaching: {
        type: String,
        required: true
    }
})

teachersDoc.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

teachersDoc.methods.generateAuthTokenTeacher = async function () {
    try {
        console.log(this._id);
        console.log(process.env.SECRET_KEY)
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
        });
        this.tokens = this.tokens.concat({ token: token });

        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}


// return basic user details
teachersDoc.methods.getCleanUser = async function () {
    // console.log(this);
    if (!this) {
        return null;
    }

    return {
        email: this.email,
        name: this.name
    }
}


const Teacher = mongoose.model('TEACHER', teachersDoc);

module.exports = Teacher;
