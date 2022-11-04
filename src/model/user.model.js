import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    identification: {type: Number, required: true, unique: true},
    password: {type: String, required: true},
    active: {type: Boolean, required: true},
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);

export default User;