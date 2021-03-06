import React from 'react'

import './dcm.css'
import { Button, Input } from 'antd'
import MyTable from '../../table'

// 数据转换通道管理的表格的栏目 们
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

export default class DataChannelMange extends React.Component{
    render(){
        return (
            // 数据转换通道管理
            <div className='dcm'>
                {/* 数据转换通道头部按钮 */}
                <div className='dcm-header'>
                    {/* 新增数据转换通道 */}
                    {/* 删除数据转换通道 */}
                    {/* 设置自动同步计划--定时执行 */}
                    {/* 搜索框 */}
                    <Input.Search enterButton placeholder='搜索方案名称'/>
                </div>
                {/* 数据转换通道主体表格部分 */}
                <div className='dcm-main'>
                    <MyTable columns={columns}/>
                </div>
            </div>
        )
    }
}