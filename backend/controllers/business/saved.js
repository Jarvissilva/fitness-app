import Business from '../../models/business.js'
import Member from '../../models/member.js'

export const add = async (req, res) => {
    try {
        const { id } = req.params
        if (req.user.type == 'business') {
            const foundBusiness = await Business.findOne({ _id: req.user.id })
            foundBusiness.saved.push({ id })
            await foundBusiness.save()
            res.status(200).json({ status: true, message: 'SAVED' })
        }
        else if (req.user.type == 'member') {
            const foundMember = await Member.findOne({ _id: req.user.id })
            foundMember.saved.push({ id })
            await foundMember.save()
            res.status(200).json({ status: true, message: 'SAVED' })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: false, message: 'SERVER ERROR' })
    }
}

export const remove = async (req, res) => {
    try {
        const { id } = req.params
        if (req.user.type == 'business') {
            const foundBusiness = await Business.findOne({ _id: req.user.id })
            const foundSaved = foundBusiness.saved.find(s => s._id == id)
            foundSaved.remove()
            await foundBusiness.save()
            res.status(200).json({ status: true, message: 'SAVED' })
        }
        else if (req.user.type == 'member') {
            const foundMember = await Member.findOne({ _id: req.user.id })
            const foundSaved = foundMember.saved.find(s => s._id == id)
            foundSaved.remove()
            await foundMember.save()
            res.status(200).json({ status: true, message: 'SAVED' })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: false, message: 'SERVER ERROR' })
    }
}