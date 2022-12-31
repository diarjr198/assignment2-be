const mongoose = require("mongoose");
const {
    Schema
} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        min: 8,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    townhall: {
        amount: {
            type: Number,
            default: 1,
            max: 1
        },
        resource: {
            golds: {
                type: Number,
                default: 100,
                max: 1000
            },
            foods: {
                type: Number,
                default: 100,
                max: 1000
            },
            soldier: {
                type: Number,
                default: 0,
                max: 500
            },
            medal: {
                type: Number,
                default: 0
            }
        }
    },
    market: {
        amount: {
            type: Number,
            default: 0
        },
        resource: [{
            type: Schema.Types.ObjectId,
            ref: 'market'
        }]
    },
    farm: {
        amount: {
            type: Number,
            default: 0
        },
        resource: [{
            type: Schema.Types.ObjectId,
            ref: 'farm'
        }]
    },
    barrack: {
        amount: {
            type: Number,
            default: 0
        },
        resource: [{
            type: Schema.Types.ObjectId,
            ref: 'barrack'
        }]
    }
}, {
    timestamps: true
});

const User = mongoose.model('user', userSchema);

module.exports = User;