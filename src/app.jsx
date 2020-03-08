import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './views/home/home'
import Welcome from './views/welcome/welcome'

export default class App extends React.Component{
    render(){
        return (
            <Switch>
                <Route path='/login' component={Welcome}/>
                <Route path='/' component={Home}/>
            </Switch>
        )
    }
}