import React from 'react'
import {Button,Input,Table} from 'antd'

import './dc.css'

export default class DataChanel extends React.Component{

    state={
        dataSource:[
            {
                name:'zyz',
                age:22
            },
            {
                name:'zzz',
                age:23
            },
            {
                name:'yyy',
                age:25
            },
            {
                name:'zyy',
                age:24
            },
            {
                name:'yzz',
                age:21
            }
        ],
        columns:[{
            title: '姓名',
            dataIndex: 'name',
            key: 'address'
          },
          {
            title: '年龄',
            dataIndex: 'age',
            sorter: (a, b) => a.age - b.age,
            sortDirections: ['descend', 'ascend']
          }
        ]
    }

    render(){
        const {dataSource,columns} = this.state
        return (
            <div>
                <div className='header'>
                    <Input.Search placeholder='搜索数据通道' onSearch={val=>console.log(val)} enterButton/>
                    <Button type='primary'>新建数据通道</Button>
                </div>
                <div>
                    <Table dataSource={dataSource} columns={columns} bordered='true'></Table>
                </div>
            </div>
            
        )
    }
}