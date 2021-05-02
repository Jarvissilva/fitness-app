import Member from '../../models/member.js'
import Business from '../../models/business.js'

export const create = async (req, res) => {
    try {
        const { reviewText } = req.body
        const { id } = req.params
        if (!reviewText)
            return res.status(400).json({ status: false, message: 'EMPTY FIELD' })
        const foundBusiness = await Business.findOne({ _id: id })
        if (!foundBusiness)
            return res.status(400).json({ status: false, message: 'NO BUSINESS EXIST' })
        const foundMember = await Member.findOne({ _id: req.user.id })
        foundBusiness.reviews.push({ name: foundMember.name, reviewText })
        await foundBusiness.save()
        res.status(200).json({ status: true, message: 'REVIEW CREATED' })
    } catch (error) {
        console.log(error);
        res.status(404).json({ status: false, message: 'SERVER ERROR' })
    }
}
export const update = async (req, res) => {
    try {
        const { reviewText } = req.body
        const { id, reviewId } = req.params
        if (!reviewText)
            return res.status(400).json({ status: false, message: 'EMPTY FIELD' })
        const foundBusiness = await Business.findOne({ _id: id })
        if (!foundBusiness)
            return res.status(400).json({ status: false, message: 'NO BUSINESS EXIST' })
        const foundReview = foundBusiness.reviews.find(r => r._id == reviewId)
        if (!foundReview)
            return res.status(400).json({ status: false, message: 'NO REVIEW EXISTS' })
        foundReview.message = reviewText
        await foundBusiness.save()
        res.status(200).json({ status: true, message: 'REVIEW UPDATED' })
    } catch (error) {
        console.log(error);
        res.status(404).json({ status: false, message: 'SERVER ERROR' })
    }
}
export const remove = async (req, res) => {
    try {
        const { id, reviewId } = req.params
        const foundBusiness = await Business.findOne({ _id: id })
        if (!foundBusiness)
            return res.status(400).json({ status: false, message: 'NO BUSINESS EXISTS' })
        const foundReview = foundBusiness.reviews.find(r => r._id == reviewId)
        if (!foundReview)
            return res.status(400).json({ status: false, message: 'NO REVIEW EXIST' })
        foundReview.remove()
        await foundGym.save()
        res.status(200).json({ status: true, message: 'REVIEW DELETED' })
    } catch (error) {
        console.log(error);
        res.status(404).json({ status: false, message: 'SERVER ERROR' })
    }
}