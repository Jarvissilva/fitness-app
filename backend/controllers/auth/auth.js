import Member from '../../models/member.js'
import Business from '../../models/business.js'

export const currentUser = async (req, res) => {
    try {
        if (req.user.type === 'member') {
            const foundMember = await Member.findOne({ _id: req.user.id })
            if (!foundMember)
                return res.status(400).json({ status: false, message: 'UNAUTHORIZED' })
            foundMember.password = null
            res.status(200).json({ status: true, user: foundMember })
        }
        else if (req.user.type === 'business') {
            const foundBusiness = await Business.findOne({ _id: req.user.id })
            if (!foundBusiness)
                return res.status(400).json({ status: false, message: 'UNAUTHORIZED' })
            foundBusiness.password = null
            res.status(200).json({ status: true, user: foundBusiness })
        }
    } catch (error) {
        console.log(error);
        res.status(200).json({ status: false, message: 'SERVER ERROR' })
    }
}