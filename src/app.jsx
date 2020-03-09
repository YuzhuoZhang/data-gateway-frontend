import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './views/home/home'
import Welcome from './views/welcome/welcome'
/**
 * 基本页面的导航
 * 主页是 /
 * 登陆页是 /login
 * 默认跳转到主页
 */
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