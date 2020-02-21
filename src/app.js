import React from 'react'
import { Switch , Route} from 'react-router-dom'

import Home from './views/main'
import {WrappedLoginForm} from './components/start/login-form'

export default class App extends React.Component{
    render(){
        return (
            <Switch>
                <Route path='/login' component={WrappedLoginForm} />
                <Route path='/' component={Home}/>
            </Switch>
        )
    }
}

