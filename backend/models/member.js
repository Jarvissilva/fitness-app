import mongoose from 'mongoose'

const MemberSchema = mongoose.Schema({
    type: { type: String, require: true, default: 'member' },
    isEmailVerified: { type: Boolean, require: true, default: false },
    profilePhoto: { type: String },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    state: { type: String, require: true },
    city: { type: String, require: true },
    postalCode: { type: String, require: true },
    address: { type: String, require: true },
    birthDate: { type: Date },
    saved: [
        {
            id: { type: String, require: true },
        }
    ],
    createdOn: { type: Date, default: Date.now() }
})

const Member = new mongoose.model('Member', MemberSchema)

export default Member