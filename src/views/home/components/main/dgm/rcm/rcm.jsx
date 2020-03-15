import React from 'react'

import './rcm.css'
import { Button, Input } from 'antd'
import MyTable from '../../table'

// 行列置换的表格的栏目 们
const columns = [
    {
        'title': '数据通道名称',
        'dataIndex': 'name',
        'key': 'name'
    },
    {
        'title': '输入数据源',
        'dataIndex': 'input',
        'key': 'input'
    },
    {
        'title': '输出数据源',
        'dataIndex': 'output',
        'key': 'output'
    },
    {
        'title': '拥有者',
        'dataIndex': 'owner',
        'key': 'owner'
    },
    {
        'title': '备注',
        'dataIndex': 'comment',
        'key': 'comment'
    },
    {
        'title': '操作',
        'dataIndex': 'action',
        'key': 'action',
        render: row=>{
            return <Button type='ghost'>编辑</Button>
        }
    }
]

export default class RowColMange extends React.Component{
    render(){
        return (
            <div className='rcm'>

                <div className='rcm-header'>

                    {/* 搜索框 */}
                    <Input.Search enterButton placeholder='搜索方案名称'/>
                </div>
                <div className='rcm-main'>
                    <MyTable columns={columns}/>
                </div>
            </div>
        )
    }
}