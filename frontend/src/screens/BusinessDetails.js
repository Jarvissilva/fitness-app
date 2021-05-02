import '../styles/screens/BusinessDetails.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as api from '../api'
import Rating from '../components/Rating'
import BottomNav from '../components/BottomNav'
import { GoLocation } from 'react-icons/go'
import { IoGlobeOutline } from 'react-icons/io5'
import { BiPhone } from 'react-icons/bi'
import { AiOutlineFieldTime } from 'react-icons/ai'
import { BsChevronDown } from 'react-icons/bs'

const Business = () => {
    const { id } = useParams()

    const [tabs, setTabs] = useState({ ov: true, rv: false, ph: false })
    const [showTiming, setShowTiming] = useState(false)
    const [showServices, setShowServices] = useState(false)
    const [business, setBusiness] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(async () => {
        const res = await api.get(`/business/${id}`)
        setBusiness(res.business)
        setLoading(false)
    }, [])
    return (
        <>{loading ? <h1>Loading...</h1> :
            <div className='screen'>
                <div className='row h-scroll b-featured-img'>
                    <img src='https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_960_720.jpg' />
                    <img src='https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_960_720.jpg' />
                </div>
                <div className='row b-detail-box'>
                    <div className='row bd-logo'>
                        <img src='https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_960_720.jpg' alt='logo' />
                    </div>
                    <div className='column  bd-details'>
                        <h1>{business.name}</h1>
                        <p>{business.category}</p>
                    </div>
                </div>
                <div className='row b-tab-slider'>
                    <BusinessTab
                        text='Overview'
                        oc={() => setTabs({ ...tabs, ov: true, rv: false, ph: false })}
                        class={tabs.ov ? 'tab-active' : ''}
                    />
                    <BusinessTab
                        text='Reviews'
                        oc={() => setTabs({ ...tabs, ov: false, rv: true, ph: false })}
                        class={tabs.rv ? 'tab-active' : ''}
                    />
                    <BusinessTab
                        text='Photos'
                        oc={() => setTabs({ ...tabs, ov: false, rv: false, ph: true })}
                        class={tabs.ph ? 'tab-active' : ''}
                    />
                </div>
                {tabs.ov &&
                    <div className='column ov-box'>
                        <div className='row ov-item'>
                            <div className='row ov-i-icon'>
                                <GoLocation size='25' />
                            </div>
                            <div className='row ov-i-text'>
                                <h1>{business.city, ', ', business.address}</h1>
                            </div>
                        </div>
                        <div className='row ov-item'>
                            <div className='row ov-i-icon'>
                                <IoGlobeOutline size='25' />
                            </div>
                            <div className='row ov-i-text'>
                                <h1>https://fitness.com</h1>
                            </div>
                        </div>
                        {business.contact_no &&
                            <div className='row ov-item'>
                                <div className='row ov-i-icon'>
                                    <BiPhone size='25' />
                                </div>
                                <div className='row ov-i-text'>
                                    <h1>+91 {business.contact_no}</h1>
                                </div>
                            </div>}
                        <div className='row ov-item' onClick={() => setShowTiming(!showTiming)}>
                            <div className='row ov-i-icon'>
                                <AiOutlineFieldTime size='25' />
                            </div>
                            <div className='row ov-i-text'>
                                <h1>Timings</h1>
                            </div>
                            <div className='row ov-i-icon'>
                                <BsChevronDown size='25' />
                            </div>
                        </div>
                        <div className='row ov-item' onClick={() => setShowTiming(!showTiming)}>
                            <div className='row ov-i-icon'>
                                <AiOutlineFieldTime size='25' />
                            </div>
                            <div className='row ov-i-text'>
                                <h1>Services</h1>
                            </div>
                            <div className='row ov-i-icon'>
                                <BsChevronDown size='25' />
                            </div>
                        </div>
                        {showTiming && <div className='column ov-timing'>
                            <div className='row ovt-row'>
                                <p>MON - </p>
                                <p>7pm - 10pm | 2am - 8am</p>
                            </div>
                            <div className='row ovt-row'>
                                <p>TUE - </p>
                                <p>7pm - 10pm | 2am - 8am</p>
                            </div>
                            <div className='row ovt-row'>
                                <p>WED - </p>
                                <p>7pm - 10pm | 2am - 8am</p>
                            </div>
                            <div className='row ovt-row'>
                                <p>THU - </p>
                                <p>7pm - 10pm | 2am - 8am</p>
                            </div>
                            <div className='row ovt-row'>
                                <p className='ovt-week'>FRI - </p>
                                <p>7pm - 10pm | 2am - 8am</p>
                            </div>
                            <div className='row ovt-row'>
                                <p>SAT - </p>
                                <p>7pm - 10pm | 2am - 8am</p>
                            </div>
                        </div>
                        }
                    </div>}
                {tabs.rv &&
                    <div class='column rv-box'>
                        <div className='row create-review-h'>
                            <h1>Write a review</h1>
                        </div>
                        <div className='column cr-form'>
                            <form className='column'>
                                <textarea cols="30" rows="10" placeholder='Write a review'></textarea>
                                <div className='row cr-submit'>
                                    <button>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>}
                {tabs.ph &&
                    <div className='column'>
                        Photos
                </div>}
                <BottomNav />
            </div>
        }
        </>
    )
}

const BusinessTab = props => {
    return (
        <div className={`row b-tab ${props.class}`} onClick={props.oc}>
            <h1>{props.text}</h1>
        </div>
    )
}

export default Business
