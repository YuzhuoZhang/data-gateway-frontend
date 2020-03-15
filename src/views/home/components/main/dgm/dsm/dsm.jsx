import React from 'react'
import { Input, Button, Tag, Modal, Select, Form, Checkbox } from 'antd'
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

import './dsm.css'
import MyTable from '../../table'

const { Search } = Input
const { Option } = Select

//数据源表格数据
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
//数据源表格表头
const columns = [
    {
        'title': '数据库名称',
        'dataIndex': 'name',
        'key': 'name'
    },
    {
        'title': '数据库类型',
        'dataIndex': 'type',
        'key': 'type',
        'sorter': (a, b) => a.type - b.type
    },
    {
        'title': '注册时间',
        'dataIndex': 'createAt',
        'key': 'createAt',
        'sorter': (a, b) => a.createAt - b.createAt
    },
    {
        'title': '连接类型',
        'dataIndex': 'isRemote',
        'key': 'isRemote',
        render: value => (
            value ? <Tag color='green'>远程连接</Tag> : <Tag color='#990099'>本地连接</Tag>
        ),
        'sorter': (a, b) => a.isRemote - b.isRemote
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
//新增数据源的布局
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
}
//对话框的默认状态，关闭新增对话框恢复默认状态
const initialState = {
    isTestAbled: false,
    isAddAbled: false,
    isShared: false
}
/**
 * 数据源管理内容--新建数据源 查询数据源  删除数据源 共享数据源
 */
export default class DataSourceMange extends React.Component {

    /**
     * 数据源管理组件的状态：
     *      多选框选中的行号的主键
     *      新建窗口的可见性
     *          新建窗口的测试按钮的可用状态
     *          新增按钮是否可用---测试连接通过再允许点新增
     *      是否共享数据库
     */
    state = {
        selectedRowKeys: [],
        addModalVisable: false,
        isTestAbled: false,
        isAddAbled: false,
        isShared: false,
        editModal: false,
        row: null
    }

    //传给table组件的回调函数
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys })
    }

    //点击删除按钮的处理，用一个确认对话框
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
    //打开新增对话框
    openAddModal = () => {
        this.setState({ addModalVisable: true })
    }

    //点击测试连接时候触发的函数
    testConnection = () => {
        console.log(this.props.form)
    }

    //添加数据源到数据库
    addDatasource = () => {
        //console.log(form)
        console.log(this.refs.addForm)
        console.log(this.refs.addForm.getFieldsValue())
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
                        destroyOnClose
                        forceRender={true}>
                        {/* 对话框的表单 */}
                        <Form {...layout} ref='addForm'>
                            {/* 数据源名称 */}
                            <Form.Item label='数据库名称' name='datasourceName'>
                                <Input placeholder='数据库名称' allowClear/>
                            </Form.Item>
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
                            <Form.Item label='服务器URL:' name='serverIP'>
                                <Input placeholder='数据库服务器IP或域名' allowClear />
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
                            <Form.Item label='端口号' name='databasePort' >
                                <Input placeholder='数据库端口号' allowClear />
                            </Form.Item>
                            {/* 数据库的描述信息，备注 */}
                            <Form.Item label='备注' name='comment'>
                                <Input placeholder='数据库的描述信息' allowClear />
                            </Form.Item>
                            {/* 是否共享数据源 */}
                            <Form.Item name='isShared'>
                                <Checkbox checked={this.state.isShared} onChange={event => this.setState({ isShared: event.target.checked })}>是否共享数据源</Checkbox>
                            </Form.Item>
                            {/* 测试连接按钮---需要用到表单除了注释和是否共享外的其他数据 */}
                            <Button onClick={this.testConnection}>测试连接</Button>
                            {/* 测试连接的结果---想写成加载中  测试通过的对勾或者  连接失败这三种状态 */}
                            {this.state.connectMessage}
                            {/* 添加和取消按钮 */}
                            <Button style={{ float: 'right' }} onClick={() => {
                                this.setState({ addModalVisable: false })
                                this.setState({ ...initialState })
                            }}>取消</Button>
                            <Button style={{ float: 'right' }} type='primary' onClick={this.addDatasource}>添加</Button>
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