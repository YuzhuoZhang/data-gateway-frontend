import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './views/home/home'
import Welcome from './views/welcome/welcome'

export default class App extends React.Component{
    render(){
        return (
            <Switch>
                <Route path='/login' component={Welcome}/>
                <Route path='/' component={Home}/>
                <Redirect from='/*' to='/' />
            </Switch>
        )
    }
}