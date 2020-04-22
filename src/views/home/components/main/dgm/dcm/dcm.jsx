import React, { Fragment } from 'react'

import './dcm.css'
import { Button, Input } from 'antd'
import MyTable from '../../table'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'

// 数据转换通道管理的表格的栏目 们
const columns = [
    {
        'title': '数据通道编号',
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
        'title': '操作',
        'dataIndex': 'action',
        'key': 'action',
        render: row=>{
            return (<Fragment>
                <Button type='ghost'>编辑</Button>
                <Button type='ghost' style={{marginLeft:'2vw'}}>查看</Button>
            </Fragment>)
        }
    }
]

const data = [
    {
        name:'1',
        input:'1',
        output:'2',
        owner:'root',
    }
]

export default class DataChannelMange extends React.Component{

    state = {
        selectedRowKeys: [],
        isShared: false,
        editModal: false,
        row: null
    }

    //传给table组件的回调函数
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys })
    }

    render(){

        const isDeleteAbled = this.state.selectedRowKeys.length > 0

        return (
            // 数据转换通道管理
            <div className='dcm'>
                {/* 数据转换通道头部按钮 */}
                <div className='dcm-header'>
                    {/* 新增数据转换通道 */}
                    <Button
                        className='dsm-header-add'
                        type='primary'
                        icon={<PlusOutlined />}>
                        新建数据转换通道
                    </Button>
                    {/* 删除数据转换通道 */}
                    <Button className='dsm-header-delete'
                        type='danger' disabled={!isDeleteAbled} icon={<DeleteOutlined />}
                        onClick={this.deleteItems}>
                        {'删除数据转换通道(' + this.state.selectedRowKeys.length + ')'}
                    </Button>
                    {/* 设置自动同步计划--定时执行 */}
                    {/* 搜索框 */}
                    <Input.Search className="dcm-header-search" enterButton placeholder='搜索方案编号'/>
                </div>
                {/* 数据转换通道主体表格部分 */}
                <div className='dcm-main'>
                    <MyTable onSelectChange={this.onSelectChange} columns={columns} dataSource={data}/>
                </div>
            </div>
        )
    }
}