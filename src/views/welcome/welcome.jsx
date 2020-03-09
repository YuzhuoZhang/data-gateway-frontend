import React from 'react'
import { Card } from 'antd'

import LoginForm from './components/login'
import './welcome.css'

/**
 * app的登陆页
 * 登陆成功后记录下用户的id和用户名
 */
export default class Welcome extends React.Component{
    render(){
        return(
            <div className='welcome'>
                <Card className='welcome-login' hoverable='true'>
                    <h1 className='welcome-title'>数据网关</h1>
                    <br/>
                    <LoginForm />
                </Card>
                
            </div>
        )
    }
}