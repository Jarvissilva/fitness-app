import '../styles/screens/Categories.css'
import React from 'react'
import { useHistory } from 'react-router-dom'
import BackHeader from '../components/BackHeader'
import BottomNav from '../components/BottomNav'

const Categories = () => {
    return (
        <div className='screen'>
            <BackHeader title='Categories' />
            <div className='row c-categories'>
                <CategoryBox
                    title='TRAINERS'
                    to='/category/trainer'
                    src='https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_960_720.jpg'
                />
                <CategoryBox
                    title='GYMS'
                    to='/category/gym'
                    src='https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_960_720.jpg'
                />
                <CategoryBox
                    title='YOGA'
                    to='/category/yoga'
                    src='https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_960_720.jpg'
                />
                <CategoryBox
                    title='GROUNDS'
                    to='/category/ground'
                    src='https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_960_720.jpg'
                />
                <CategoryBox
                    title='ZUMBA'
                    to='/category/zumba'
                    src='https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_960_720.jpg'
                />
            </div>
            <BottomNav />
        </div>
    )
}

const CategoryBox = props => {
    const history = useHistory()
    return (
        <div className='row c-cat-box' onClick={() => history.push(props.to)} style={{ background: `url('${props.src}')` }}>
            <h1>{props.title}</h1>
        </div>
    )
}

export default Categories
