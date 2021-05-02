import './styles/App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './screens/Home'
import Account from './screens/Account'
import Search from './screens/Search'
import SearchResults from './screens/SearchResults'
import Categories from './screens/Categories'
import Saved from './screens/Saved'
import Category from './screens/Category'
import BusinessDetails from './screens/BusinessDetails'
import MemberRegister from './screens/member/Register'
import MemberLogin from './screens/member/Login'
import BusinessRegister from './screens/business/Register'
import BusinessLogin from './screens/business/Login'
import EmailVerify from './screens/EmailVerify'
import EditAccount from './screens/member/EditAccount'

const App = () => {
    return (
        <>
            <Router>
                <Route exact path='/' component={Home} />
                <Route exact path='/account' component={Account} />
                <Route exact path='/account/edit' component={EditAccount} />
                <Route exact path='/search' component={Search} />
                <Route exact path='/saved' component={Saved} />
                <Route exact path='/category/:id' component={Category} />
                <Route exact path='/categories' component={Categories} />
                <Route exact path='/search/:id' component={SearchResults} />
                <Route exact path='/business/:id' component={BusinessDetails} />
                <Route exact path='/member/account/register' component={MemberRegister} />
                <Route exact path='/member/account/login' component={MemberLogin} />
                <Route exact path='/business/account/register' component={BusinessRegister} />
                <Route exact path='/business/account/login' component={BusinessLogin} />
                <Route exact path='/:type/account/email-verify/:id' component={EmailVerify} />
            </Router>
        </>
    )
}

export default App
