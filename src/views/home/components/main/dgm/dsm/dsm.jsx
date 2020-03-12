import React from 'react'
import { Input, Button, Tag, Modal, Select, Form, Checkbox } from 'antd'
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

import './dsm.css'
import MyTable from '../../table'

const { Search } = Input
const { Option } = Select
/**
 * 数据源管理内容--新建数据源 查询数据源  删除数据源 共享数据源
 */

const dataSource = [
    {
        'key': '1',
        'name': 'mysql数据库',
        'type': 'mysql',
        'createAt': '2020-3-9',
        'owner': 'root',
        'isRemote': true,
        'isShared': true,
        'comment': '一些备注'
    },
    {
        'key': '2',
        'name': 'mysql数据库',
        'type': 'mysql',
        'createAt': '2020-3-9',
        'owner': 'root',
        'isRemote': true,
        'isShared': true,
        'comment': '一些备注'
    },
    {
        'key': '3',
        'name': 'mssql数据库',
        'type': 'mssql',
        'createAt': '2020-3-8',
        'owner': 'admin',
        'isRemote': false,
        'isShared': false,
        'comment': '一些备注'
    },
    {
        'key': '4',
        'name': 'oracle数据库',
        'type': 'oracle',
        'createAt': '2020-3-9',
        'owner': 'admin',
        'isRemote': true,
        'isShared': false,
        'comment': '一些备注'
    },
    {
        'key': '5',
        'name': 'sqlServer数据库',
        'type': 'sqlServer',
        'createAt': '2020-3-6',
        'owner': 'admin',
        'isRemote': false,
        'isShared': true,
        'comment': '一些备注'
    },
    {
        'key': '6',
        'name': 'mysql数据库',
        'type': 'mysql',
        'createAt': '2020-3-9',
        'isRemote': true,
        'owner': 'admin',
        'isShared': true,
        'comment': '一些备注'
    }
]

const columns = [
    {
        'title': '数据库名称',
        'dataIndex': 'name',
        'key': 'name'
    },
    {
        'title': '数据库类型',
        'dataIndex': 'type',
        'key': 'type'
    },
    {
        'title': '注册时间',
        'dataIndex': 'createAt',
        'key': 'createAt'
    },
    {
        'title': '连接类型',
        'dataIndex': 'isRemote',
        'key': 'isRemote',
        render: value => (
            value ? <Tag color='green'>远程连接</Tag> : <Tag color='#990099'>本地连接</Tag>
        )
    },
    {
        'title': '拥有者',
        'dataIndex': 'owner',
        'key': 'owner'
    },
    {
        'title': '是否共享',
        'dataIndex': 'isShared',
        'key': 'isShared',
        render: value => (
            value ? <Tag color='geekblue'>是</Tag> : <Tag color='red'>否</Tag>
        )
    },
    {
        'title': '备注',
        'dataIndex': 'comment',
        'key': 'comment'
    }
]

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 },
}

export default class DataSourceMange extends React.Component {

    state = {
        selectedRowKeys: [],
        addModalVisable: false
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys })
    }

    deleteItems = () => {
        Modal.confirm({
            title: '确定要删除这' + this.state.selectedRowKeys.length + '条数据源吗',
            icon: <ExclamationCircleOutlined />,
            cancelText: '取消',
            onCancel: () => console.log('cancel'),
            okType: 'danger',
            okText: '确认',
            onOk: () => this.setState({ selectedRowKeys: [] })
        })
    }

    openAddModal = () => {
        this.setState({ addModalVisable: true })
    }

    handleCancel = () => {
        this.setState({ addModalVisable: false })
    }

    handleFinsh = value => {
        console.log(value)
    }

    testConnection = () => {

    }

    addDatasource = () => {

    }



    render() {

        const isDeleteAbled = this.state.selectedRowKeys.length > 0

        return (
            <div className='dsm'>
                {/* 数据源管理的头部 */}
                <div className='dsm-header'>

                    <Button
                        className='dsm-header-add'
                        type='primary'
                        icon={<PlusOutlined />}
                        onClick={this.openAddModal}>
                        新建数据源
                    </Button>
                    {/* 点击新建的时候弹出来的对话框 */}
                    <Modal
                        // title='添加数据源'
                        visible={this.state.addModalVisable}
                        centered={true}
                        closable={false}
                        footer={null}
                        destroyOnClose>
                        {/* 对话框的表单 */}
                        <Form {...layout}>
                            {/* 数据库类型的下拉框 */}
                            <Form.Item label='数据源类型' name='datasourceType'>
                                <Select placeholder='请选择数据源' style={{ width: '150px' }}>
                                    <Option value='mysql'>MySQL</Option>
                                    <Option value='oracle'>Oracle</Option>
                                    <Option value='sqlserver'>SQL Server</Option>
                                    <Option value='excel'>Excel</Option>
                                </Select>
                            </Form.Item>
                            {/* 数据库服务器IP */}
                            <Form.Item label='服务器IP:' name='serverIP'>
                                <Input placeholder='数据库服务器IP' allowClear />
                            </Form.Item>
                            {/* 数据库用户名 */}
                            <Form.Item label='用户名' name='databaseUser'>
                                <Input placeholder='数据库用户名' allowClear />
                            </Form.Item>
                            {/* 数据库密码 */}
                            <Form.Item label='密码' name='databasePwd'>
                                <Input.Password placeholder='数据库密码' allowClear />
                            </Form.Item>
                            {/* 数据库端口号 */}
                            <Form.Item label='端口号' name='databasePort' rules={[{ type: 'integer' }]}>
                                <Input placeholder='数据库端口号' allowClear />
                            </Form.Item>
                            {/* 是否共享数据源 */}
                            <Form.Item name='isShared'>
                                <Checkbox>是否共享数据源</Checkbox>
                            </Form.Item>
                            {/* 数据库的描述信息，备注 */}
                            <Form.Item label='备注' name='comment'>
                                <Input placeholder='数据库的描述信息' allowClear />
                            </Form.Item>
                            <Button onClick={this.testConnection}>测试连接</Button>
                            {this.state.connectMessage}
                            <Button style={{float:'right'}} onClick={this.handleCancel}>取消</Button>
                            <Button style={{float:'right'}} type='primary' onClick={this.addDatasource} htmlType='submit'>添加</Button>
                        </Form>

                    </Modal>


                    <Button className='dsm-header-delete'
                        type='danger' disabled={!isDeleteAbled} icon={<DeleteOutlined />}
                        onClick={this.deleteItems}>
                        {'删除数据源(' + this.state.selectedRowKeys.length + ')'}
                    </Button>
                    <Search className='dsm-header-search' placeholder='搜索数据库名称' onSearch={value => console.log(value)} enterButton />
                </div>

                {/* 数据源管理的主体部分--表格 */}
                <div className='dsm-main'>
                    <MyTable onSelectChange={this.onSelectChange} columns={columns} dataSource={dataSource} />
                </div>
            </div>
        )
    }
}