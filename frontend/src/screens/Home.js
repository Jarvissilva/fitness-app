import '../styles/screens/Home.css'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { CgMenuRightAlt } from 'react-icons/cg'
import { IoIosSearch } from 'react-icons/io'
import { VscArrowRight } from 'react-icons/vsc'
import { GoLocation } from 'react-icons/go'
import * as api from '../api'

import YogaIcon from '../assets/icons/yoga-cat.svg'
import GymIcon from '../assets/icons/gym-cat.svg'
import TrainerIcon from '../assets/icons/trainer-cat.svg'
import GroundIcon from '../assets/icons/ground-cat.svg'
import ZumbaIcon from '../assets/icons/zumba-cat.svg'
import BottomNav from '../components/BottomNav'
import Rating from '../components/Rating'
import MenuDrawer from '../components/MenuDrawer'

const Home = () => {
    const history = useHistory()
    const [businesses, setBusinesses] = useState([])
    const [loading, setLoading] = useState(true)
    const [menuDrawer, setMenuDrawer] = useState(false)

    useEffect(async () => {
        const res = await api.get('/businesses')
        setBusinesses(res.businesses)
        setLoading(false)
    }, [])

    return (
        <>
            {loading ? <h1>Loading..</h1> :
                <div className='screen'>
                    {menuDrawer ? <MenuDrawer className='slide-in' /> : <MenuDrawer className='slide-out' />}
                    <div className='row h-header'>
                        <div className='row h-header-logo'>
                            <h1>Fitwing</h1>
                        </div>
                        <div className='row h-header-menu-btn'>
                            <CgMenuRightAlt
                                size='40'
                                color='var(--primary-color)'
                                onClick={() => setMenuDrawer(!menuDrawer)}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='row h-search-bar' onClick={() => history.push('/search')}>
                            <div className='row h-sb-text'>
                                <p>Search for anything</p>
                            </div>
                            <div className='row h-sb-icon'>
                                <IoIosSearch size='30' color='#fff' />
                            </div>
                        </div>
                    </div>
                    <div className='row h-scroll h-category-sec'>
                        <CategoryBox title='Trainer' icon={TrainerIcon} to='/category/trainer' />
                        <CategoryBox title='Yoga' icon={YogaIcon} to='/category/yoga' />
                        <CategoryBox title='Zumba' icon={ZumbaIcon} to='/category/zumba' />
                        <CategoryBox title='Gym' icon={GymIcon} to='/category/gym' />
                        <CategoryBox title='Ground' icon={GroundIcon} to='/category/ground' />
                        <div className='column hc-view-more'>
                            <div className='column' onClick={() => history.push('/categories')}>
                                <VscArrowRight size='30' />
                            </div>
                            <h1>View More</h1>
                        </div>
                    </div>
                    <div className='h-nearby-sec'>
                        <div className='row h-ns-header'>
                            <div className='row h-ns-htext'>
                                <h1>Nearby Places</h1>
                            </div>
                            <div className='row h-ns-more'>
                                <VscArrowRight size='30' />
                            </div>
                        </div>
                        <div className='row h-scroll h-nearby-biz'>
                            {businesses && businesses.map(b => <NearbyCard biz={b} key={b._id} />)}
                        </div>
                    </div>
                    <div className='row h-nb-header'>
                        <h1>Explore More</h1>
                    </div>
                    <div className='column h-mp'>
                        {businesses && businesses.map(b => <Card2 biz={b} key={b._id} />)}
                    </div>
                    <BottomNav />
                </div>
            }
        </>
    )
}

const CategoryBox = props => {
    const history = useHistory()
    return (
        <div className='column h-cat-box'>
            <div className='row h-cb-icon' onClick={() => history.push(props.to)}>
                <img src={props.icon} alt='yoga' />
            </div>
            <div className='row h-cb-title'>
                <p>{props.title}</p>
            </div>
        </div>
    )
}

const NearbyCard = props => {
    const history = useHistory()
    return (
        <div className='column nearby-card' onClick={() => history.push(`/business/${props.biz._id}`)}>
            <img src='https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_960_720.jpg' alt='img' />
            <div className='column nearby-c-meta '>
                <h1>{props.biz.name}</h1>
                <Rating />
                <div className='row c-2-m-city'>
                    <GoLocation color='' />
                    <p>{props.biz.city}</p>
                </div>
            </div>
        </div>
    )
}
const Card2 = props => {
    const history = useHistory()
    return (
        <div className='row card-2' onClick={() => history.push(`/business/${props.biz._id}`)}>
            <img src='https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_960_720.jpg' />
            <div className='column card-2-meta'>
                <div className='row c-2-m-name'>
                    <h1>{props.biz.name}</h1>
                </div>
                <Rating />
                <div className='row c-2-m-city'>
                    <GoLocation color='' />
                    <p>{props.biz.city}</p>
                </div>
            </div>
        </div>
    )
}

export default Home

