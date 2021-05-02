import mongoose from 'mongoose'

const BusinessSchema = mongoose.Schema({
    type: { type: String, require: true, default: 'business' },
    isEmailVerified: { type: Boolean, require: true, default: false },
    isActivated: { type: Boolean, require: true, default: false },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    address: { type: String, require: true },
    contact_no: { type: String, require: true },
    owner: { type: String, require: true },
    state: { type: String, require: true },
    city: { type: String, require: true },
    postalCode: { type: String, require: true },
    website: { type: String },
    category: { type: Array, require: true },
    logo: { type: String },
    saved: [
        {
            id: { type: String, require: true },
        }
    ],
    timing: [

    ],
    images: [
        {
            url: { type: String, require: true },
            alt: { type: String, require: true },
        }
    ],
    reviews: [
        {
            name: { type: String, require: true },
            reviewText: { type: String, require: true },
            createdOn: { type: Date, default: Date.now() }
        }
    ],
    rating: { type: String },
    createdOn: { type: Date, default: Date.now() }
})

const Business = new mongoose.model('Business', BusinessSchema)

export default Business