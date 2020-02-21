import React,{Component} from 'react'

import {WrappedLoginForm} from './login-form'
import backgroundImage from '../../assets/images/background.jpg'

export default class Start extends Component{
    render(){
        return (
            <div style={{backgroundImage}}>
                <WrappedLoginForm />
            </div>
            
        )
    }
}