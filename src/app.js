import React from 'react'
import {BrowserRouter} from 'react-router-dom'

import {WrappedLoginForm} from './components/start/login-form'
import SiderDemo from './views/main'

export default class App extends React.Component{
    render(){
        return (
                <SiderDemo/>
        )
    }
}

