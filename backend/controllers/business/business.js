import Business from '../../models/business.js'

export const fetchAll = async (req, res) => {
    try {
        const businesses = await Business.find()
        res.status(200).json({ status: true, businesses })
    } catch (error) {
        console.log(error)
        res.status(404).json({ status: false, message: 'SERVER ERROR' })
    }
}

export const fetchBy = async (req, res) => {
    try {
        const { id } = req.params
        const { data } = req.body
        console.log(data);
        if (id == 'city') {
            const foundCities = await Business.find({ city: data })
            if (!foundCities)
                return res.status(400).json({ status: false, message: 'no cities found' })
            res.status(200).json({ status: true, businesses: foundCities })
        }
        else if (id == 'state') {
            const foundStates = await Business.find({ state: data })
            if (!foundStates)
                return res.status(400).json({ status: false, message: 'no states found' })
            res.status(200).json({ status: true, businesses: foundStates })
        }
        else if (id == 'category') {
            const foundCategories = await Business.find({ category: data })
            if (!foundCategories)
                return res.status(400).json({ status: false, message: 'no Categories found' })
            res.status(200).json({ status: true, businesses: foundCategories })
        }
        else {
            return res.status(400).json({ status: false, message: 'NOTHING FOUND' })
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({ status: false, message: 'SERVER ERROR' })
    }
}

export const fetchById = async (req, res) => {
    try {
        const { id } = req.params
        const business = await Business.findOne({ _id: id })
        if (!business)
            return res.status(200).json({ status: false, message: 'NO BUSINESS FOUND' })
        res.status(200).json({ status: true, business })
    } catch (error) {
        console.log(error)
        res.status(404).json({ status: false, message: 'SERVER ERROR' })
    }
}

export const search = async (req, res) => {
    try {
        const { term } = req.params
        if (!term) return res.status(200).json({ status: true, message: '' })
        const businesses = await Business.find()
        const foundBusinesses = businesses.filter(b => b.name.toLowerCase().match(term))
        res.status(200).json({ status: true, searchResults: foundBusinesses })
    } catch (error) {
        console.log(error)
        res.status(404).json({ status: false, message: 'SERVER ERROR' })
    }
}