import React,{Component} from 'react'

import {WrappedLoginForm} from './login-form'

import './start.css'

export class Start extends Component{
    render(){
        return (
            <div className='welcome'>
                <div className='login'>
                    <div className='logo'>Data&nbsp;&nbsp;Gateway</div>
                    <WrappedLoginForm className='wrapped-login-form'/>
                </div>
                
            </div>
            
        )
    }
}