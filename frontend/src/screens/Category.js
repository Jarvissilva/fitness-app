import '../styles/screens/Category.css'
import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import * as api from '../api'
import { GoLocation } from 'react-icons/go'
import BackHeader from '../components/BackHeader'
import BottomNav from '../components/BottomNav'
import Rating from '../components/Rating'

const Category = () => {
    const { id } = useParams()

    const [businesses, setBusinesses] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(async () => {
        const res = await api.post(`/businesses/category`, { data: id })
        setBusinesses(res.businesses)
        setLoading(false)
    }, [])
    return (
        <>
            {loading ? <h1>Loading...</h1> :
                <div className='screen'>
                    <BackHeader title={id} />
                    <div className='row c-category-sec'>
                        {businesses.map(b => <CategoryCard name={b.name} key={b._id} ct={b.city} id={b._id} />)}
                    </div>
                    <BottomNav />
                </div>
            }
        </>
    )
}

const CategoryCard = props => {
    const history = useHistory()
    return (
        <div className='column c-category-card' onClick={() => history.push(`/business/${props.id}`)}>
            <img src='https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_960_720.jpg' alt='img' />
            <div className='column cc-card-meta'>
                <div className='row ccm-name'>
                    <h1>{props.name}</h1>
                </div>
                <Rating />
                <div className='row ccm-city'>
                    <GoLocation color='' />
                    <p>{props.ct}</p>
                </div>
            </div>
        </div>
    )
}

export default Category
