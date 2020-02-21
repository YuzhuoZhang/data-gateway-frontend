import React from 'react'
import {Button,Icon,Input,} from 'antd'

export default class DataChanel extends React.Component{
    render(){
        return (
            <div>
                <Input.Search placeholder='搜索数据通道' onSearch={val=>console.log(val)}/>
            </div>
        )
    }
}