import React, { Fragment } from 'react'

import './dcm.css'
import { Button, Input, Modal, Form } from 'antd'
import MyTable from '../../table'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'

// 数据转换通道管理的表格的栏目 们
const columns = [
    {
        'title': '数据通道编号',
        'dataIndex': 'id',
        'key': 'id'
    },
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
        id:1,
        name:'MySQL-Oracle',
        input:'MySQL数据库',
        output:'Oracle数据库',
        owner:'root',
    }
]

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
}

export default class DataChannelMange extends React.Component{

    state = {
        selectedRowKeys: [],
        isShared: false,
        editModal: false,
        row: null,
        addModalVisable: false,
    }

    //传给table组件的回调函数
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys })
    }

    openAddModal=()=>{
        this.setState({ addModalVisable: true })
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
                        icon={<PlusOutlined />}
                        onClick={this.openAddModal}>
                        新建数据转换通道
                    </Button>
                    <Modal
                        // title='添加数据源'
                        visible={this.state.addModalVisable}
                        centered={true}
                        closable={false}
                        footer={null}
                        destroyOnClose
                        forceRender={true}>
                        {/* 对话框的表单 */}
                        <Form {...layout} ref='addForm'>
                            <Form.Item label='数据通道名称' name='name'>
                                <Input placeholder='数据通道名称' allowClear />
                            </Form.Item>
                            <Form.Item label='源数据源编号' name='source_id'>
                                <Input placeholder='源数据源编号' allowClear />
                            </Form.Item>
                            <Form.Item label='源数据源表名' name='source_table'>
                                <Input placeholder='源数据源表名' allowClear />
                            </Form.Item>
                            <Form.Item label='源数据源列名' name='source_cols'>
                                <Input placeholder='以逗号隔开：id,name,number' allowClear />
                            </Form.Item>
                            <Form.Item label='目标数据源编号' name='target_id'>
                                <Input placeholder='目标数据源编号' allowClear />
                            </Form.Item>
                            <Form.Item label='目标据源表名' name='target_table'>
                                <Input placeholder='目标据源表名' allowClear />
                            </Form.Item>
                            <Form.Item label='目标数据源列名' name='source_cols'>
                                <Input placeholder='以逗号隔开：id,name,number' allowClear />
                            </Form.Item>
                            
                            {/* 添加和取消按钮 */}
                            
                            <Button type='primary'>添加</Button>
                            <Button style={{ marginLeft: '2vw' }} onClick={() => {
                                this.setState({ addModalVisable: false })
                            }}>取消</Button>
                        </Form>

                    </Modal>
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