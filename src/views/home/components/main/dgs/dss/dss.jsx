import React from 'react'
import { DatabaseOutlined, TableOutlined, DownSquareOutlined, SearchOutlined  } from '@ant-design/icons'
import { Tree, Select, Button } from 'antd'
import './dss.css'
import MyTable from '../../table'

// 主体部分左侧属性列表的值
const treeData = [
    {
        title: 'mysql数据库',
        key: '0',
        icon: <DatabaseOutlined />,
        children: [
            {
                title: 'book',
                key: '0-0',
                icon: <TableOutlined />
            }
        ]
    },
    {
        title: 'oracle数据库',
        key: '1',
        icon: <DatabaseOutlined />,
        children: [
            {
                title: '表格1',
                key: '1-0',
                icon: <TableOutlined />
            },
            {
                title: '表格2',
                key: '1-1',
                icon: <TableOutlined />
            },
            {
                title: '表格3',
                key: '1-2',
                icon: <TableOutlined />
            }
        ]
    }
]

const columns=[
    {
        'title': 'id',
        'dataIndex': 'id',
        'key': 'id'
    },
    {
        'title': 'name',
        'dataIndex': 'name',
        'key': 'name',
    },
    {
        'title': 'price',
        'dataIndex': 'price',
        'key': 'price',

    }
]

const dataSource=[
    {
        id:'1',
        name:'c++从入门到精通',
        price:'45'
    },
    {
        id:'2',
        name:'MySQL索引优化',
        price:'45'
    }
]

export default class DataSourceSearch extends React.Component {

    state = {
        users: []
    }

    render() {

        const { users } = this.state

        return (
            // 数据源检索界面
            <div className='dss'>
                {/* 一如既往的头部 */}
                <div className='dss-header'>
                    <Select placeholder='请选择用户' ref='user' style={{width:'200px'}}>
                        {
                            users.map(user =>
                                <Select.Option value='user'>{user}</Select.Option>
                            )
                        }
                    </Select>
                    <Select placeholder='请选择数据库类型' ref='type' style={{width:'200px',marginLeft:'2vw'}}>
                        <Select.Option value='mysql'>MySQL</Select.Option>
                        <Select.Option value='oracle'>Oracle</Select.Option>
                        <Select.Option value='sqlserver'>SQL Server</Select.Option>
                    </Select>

                    <Button type='primary' icon={<SearchOutlined/>} style={{marginLeft:'2vw'}}/>
                </div>
                {/* 一如既往的主体部分 */}
                <div className='dss-main'>
                    {/* 左侧数据源列表 */}
                    <div className='dss-main-tree'>
                        <Tree
                            treeData={treeData}
                            showIcon={true}
                            switcherIcon={<DownSquareOutlined style={{ fontSize: '18px' }} />} />
                    </div>

                    {/* 右侧表格查看数据---嗨~可视化的方式查看数据库中数据咯 */}
                    <div className='dss-main-table'>
                        <MyTable columns={columns} dataSource={dataSource}/>
                    </div>

                </div>
            </div>
        )
    }
}