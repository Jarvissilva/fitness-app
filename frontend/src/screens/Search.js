import '../styles/screens/Search.css'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { IoIosSearch } from 'react-icons/io'
import * as api from '../api'
import BottomNav from '../components/BottomNav'

const Search = () => {
    const history = useHistory()

    const [searchResults, setSearchResults] = useState([])
    const [query, setQuery] = useState('')
    const [Loading, setLoading] = useState(false)

    const handleSearch = e => {
        e.preventDefault()
        history.push(`/search/${query}`)
    }
    const handleChange = async e => {
        if (e.target.value.length > 0) {
            const searchTerm = e.target.value.toLowerCase()
            setQuery(e.target.value.toLowerCase());
            setLoading(true)
            const res = await api.get(`/business/search/${searchTerm}`)
            setSearchResults(res.searchResults)
            setLoading(false)
        }
        else {
            setSearchResults([])
        }
    }

    return (
        <div>
            <div className='row search-box'>
                <form className='row' onSubmit={handleSearch}>
                    <div className='row sb-icon'>
                        <IoIosSearch size='40' />
                    </div>
                    <input type='text' placeholder='Search for anything' onChange={handleChange} />
                </form>
            </div>
            <div className='column s-search-results'>
                {Loading ? <h1>Loading..</h1> :
                    searchResults.map(g => <SearchResult name={g.name} id={g._id} key={g._id} />)
                }
            </div>
            <BottomNav />
        </div>
    )
}

const SearchResult = props => {
    const history = useHistory()
    return (
        <div className='row s-s-result' onClick={() => history.push(`/business/${props.id}`)}>
            <img src='https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_960_720.jpg' />
            <div className='column ssr-meta'>
                <h1>{props.name}</h1>
                <p>{props.city}</p>
            </div>
        </div>
    )
}

export default Search
