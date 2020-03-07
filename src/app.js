import React from 'react'
import { Switch , Route} from 'react-router-dom'

import Home from './views/main'
import {Start} from './components/start/start'

export default class App extends React.Component{
    render(){
        return (
            <Switch>
                <Route path='/login' component={Start} />
                <Route path='/' component={Home}/>
            </Switch>
        )
    }
}

