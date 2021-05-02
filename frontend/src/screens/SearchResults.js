import '../styles/screens/SearchResults.css'
import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import * as api from '../api'
import BottomNav from '../components/BottomNav'
import Rating from '../components/Rating'
import { IoIosSearch } from 'react-icons/io'
import { GoLocation } from 'react-icons/go'

const SearchResults = () => {
    const history = useHistory()
    const { id } = useParams()

    const [searchResults, setSearchResults] = useState([])
    const [formData, setFormData] = useState(id)
    const [loading, setLoading] = useState(true)

    useEffect(async () => {
        try {
            const res = await api.get(`/business/search/${id}`)
            setSearchResults(res.searchResults)
            setLoading(false)
        } catch (error) {
        }
    }, [[], formData])
    const handleSearch = async e => {
        e.preventDefault()
        history.push(`/search/${formData.toLowerCase()}`)
    }
    const handleChange = async (e) => {
        setFormData(e.target.value)
    }
    return (
        <>{loading ? <h1>Loading..</h1> :
            <div className='screen'>
                <div className='row search-box sr-header'>
                    <form className='row' onSubmit={handleSearch}>
                        <div className='row sb-icon'>
                            <IoIosSearch size='40' />
                        </div>
                        <input type='text' placeholder='Search for anything' value={formData} onChange={handleChange} />
                    </form>
                </div>
                <div className='row search-custom'>
                    <div className='row sc-sort'>
                        <button>Sort</button>
                    </div>
                    <div className='row sc-filter'>
                        <button>Filter</button>
                    </div>
                </div>
                <div className='column sr-column'>
                    {searchResults.map(s => <SearchResult key={s._id} name={s.name} ct={s.city} id={s._id} />)}
                </div>
                <BottomNav />
            </div>
        }
        </>
    )
}

const SearchResult = props => {
    const history = useHistory()
    return (
        <div className='row sr-card' onClick={() => history.push(`/business/${props.id}`)}>
            <img src='https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_960_720.jpg' />
            <div className='column sr-card-meta'>
                <div className='row sr-m-name'>
                    <h1>{props.name}</h1>
                </div>
                <Rating />
                <div className='row sr-m-city'>
                    <GoLocation color='' />
                    <p>{props.ct}</p>
                </div>
            </div>
        </div>
    )
}

export default SearchResults
