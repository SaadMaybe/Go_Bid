const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    userID: {
        type: Number,
        required: true
    }, 
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    completedAuctions: {
        type: Array,
        required: true,
        default : []
    },
    completedBids: {
        type: Array,
        required: true,
        default : []
    },
    cancelledAuctions: {
        type: Array,
        required: true,
        default : []
    },
    cancelledBids: {
        type: Array,
        required: true,
        default : []
    },
    accountStatus: {
        type: String,
        required: true,
        default: "User"
    }
});

const UsersModel = mongoose.model('Users', UsersSchema);

module.exports = UsersModel;