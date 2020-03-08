import React from 'react'

import LoginForm from './components/login'

export default class Welcome extends React.Component{
    render(){
        return(
            <div>
                <div>数据网关</div>
                <LoginForm />
            </div>
        )
    }
}