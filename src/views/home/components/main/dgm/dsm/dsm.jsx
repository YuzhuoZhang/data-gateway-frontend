import React from 'react'
import { Input, Button, Table, Tag } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'

import './dsm.css'
import MyTable from '../../table'

const {Search} = Input
const {} = Table
/**
 * 数据源管理内容--新建数据源 查询数据源  删除数据源 共享数据源
 */

const dataSource=[
    {
        'key':'1',
        'name':'mysql数据库',
        'type':'mysql',
        'createAt':'2020-3-9',
        'owner':'root',
        'isRemote':true,
        'isShared':true,
        'comment':'一些备注'
    },
    {
        'key':'2',
        'name':'mysql数据库',
        'type':'mysql',
        'createAt':'2020-3-9',
        'owner':'root',
        'isRemote':true,
        'isShared':true,
        'comment':'一些备注'
    },
    {
        'key':'3',
        'name':'mssql数据库',
        'type':'mssql',
        'createAt':'2020-3-8',
        'owner':'admin',
        'isRemote':false,
        'isShared':false,
        'comment':'一些备注'
    },
    {
        'key':'4',
        'name':'oracle数据库',
        'type':'oracle',
        'createAt':'2020-3-9',
        'owner':'admin',
        'isRemote':true,
        'isShared':false,
        'comment':'一些备注'
    },
    {
        'key':'5',
        'name':'sqlServer数据库',
        'type':'sqlServer',
        'createAt':'2020-3-6',
        'owner':'admin',
        'isRemote':false,
        'isShared':true,
        'comment':'一些备注'
    },
    {
        'key':'6',
        'name':'mysql数据库',
        'type':'mysql',
        'createAt':'2020-3-9',
        'isRemote':true,
        'owner':'admin',
        'isShared':true,
        'comment':'一些备注'
    }
]

const columns = [
    {
        'title':'数据库名称',
        'dataIndex':'name',
        'key':'name'
    },
    {
        'title':'数据库类型',
        'dataIndex':'type',
        'key':'type'        
    },
    {
        'title':'注册时间',
        'dataIndex':'createAt',
        'key':'createAt'        
    },
    {
        'title':'连接类型',
        'dataIndex':'isRemote',
        'key':'isRemote',
        render: value=>(
            value?<Tag color='green'>远程连接</Tag>:<Tag color='#990099'>本地连接</Tag>
        )
    },
    {
        'title':'拥有者',
        'dataIndex':'owner',
        'key':'owner'
    },
    {
        'title':'是否共享',
        'dataIndex':'isShared',
        'key':'isShared' ,
        render: value=>(
            value?<Tag color='geekblue'>是</Tag>:<Tag color='red'>否</Tag>
        )       
    },
    {
        'title':'备注',
        'dataIndex':'comment',
        'key':'comment'        
    }
]
        

export default class DataSourceMange extends React.Component{

    state={
        selectedRowKeys: []
    }

    render(){

        const {selectedRowKeys} = this.state

        const rowSelection={
            selectedRowKeys,
            onChange: this.onSelectChange
        }

        return (
            <div className='dsm'>
                {/* 数据源管理的头部 */}
                <div className='dsm-header'>
                    <Button className='dsm-header-add' type='primary' icon={<PlusOutlined />}>新建数据源</Button>
                    <Button className='dsm-header-delete' type='danger' disabled={true} icon={<DeleteOutlined />}>删除数据源</Button>
                    <Search className='dsm-header-search' placeholder='搜索数据源' onSearch={value=>console.log(value)} enterButton/>
                </div>

                {/* 数据源管理的主体部分--表格 */}
                <div className='dsm-main'>
                    <MyTable rowSelection={rowSelection} columns={columns} dataSource={dataSource}/>
                </div>
            </div>
        )
    }
}