import React from 'react'

import LoginForm from './components/login'
import './welcome.css'

export default class Welcome extends React.Component{
    render(){
        return(
            <div className='welcome'>
                <h1 className='welcome-title'>数据网关</h1>
                <br/>
                <LoginForm />
            </div>
        )
    }
}