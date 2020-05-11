import React, { Fragment } from 'react'
import {
    DatabaseOutlined,
    TableOutlined,
    DownSquareOutlined,
    SearchOutlined,
    ExclamationCircleOutlined,
    PlusOutlined,
    DeleteOutlined
} from '@ant-design/icons'
import {
    Tree,
    Select,
    Button,
    Descriptions,
    Form,
    Input,
    Modal,
    Checkbox,
    Tag,
    message,
    Table
} from 'antd'
import {
    Route,
    Switch,
    Redirect,
    Link
} from 'react-router-dom'

import './datasource.css'
import MyTable from '../table'
import { reqDataSourceList, reqAddDatasource, reqDatasourceDetail, reqDeleteDatasources } from '../../../../../api/apis'

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

const columns = [
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

const dataSource = [
    {
        id: '1',
        name: 'c++从入门到精通',
        price: '45'
    },
    {
        id: '2',
        name: 'MySQL索引优化',
        price: '45'
    }
]

class Datasource extends React.Component {
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
                    <Select placeholder='请选择用户' ref='user' style={{ width: '200px' }}>
                        {
                            users.map(user =>
                                <Select.Option value='user'>{user}</Select.Option>
                            )
                        }
                    </Select>
                    <Select placeholder='请选择数据库类型' ref='type' style={{ width: '200px', marginLeft: '2vw' }}>
                        <Select.Option value='mysql'>MySQL</Select.Option>
                        <Select.Option value='oracle'>Oracle</Select.Option>
                        <Select.Option value='sqlserver'>SQL Server</Select.Option>
                    </Select>

                    <Button type='primary' icon={<SearchOutlined />} style={{ marginLeft: '2vw' }} />
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
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            pagination={{ position: ['bottomCenter'] }}
                            bordered />
                    </div>

                </div>
            </div>
        )
    }
}

class DatasourceManagement extends React.Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route path='/ds/dsm/list' component={DatasourceList} />
                    <Route path='/ds/dsm/detail/:id' component={DatasourceDetail} />
                    <Redirect to='/ds/dsm/list' />
                </Switch>
            </Fragment>
        )
    }
}

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



class DatasourceList extends React.Component {
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
        isAddAbled: false,
        isShared: false,
        editModal: false,
        row: null,
        data: []
    }
    //数据源表格表头
    columns = [
        {
            'title': '编号',
            'dataIndex': 'id',
            'key': 'id'
        },
        {
            'title': '数据源名称',
            'dataIndex': 'name',
            'key': 'name'
        },
        {
            'title': '数据库名称',
            'dataIndex': 'dbName',
            'key': 'dbName'
        },
        {
            'title': '数据库类型',
            'dataIndex': 'dbType',
            'key': 'dbType',
            'sorter': (a, b) => a.type - b.type
        },
        {
            'title': '拥有者',
            'dataIndex': 'ownerId',
            'key': 'ownerId'
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
            render: (text, record) => {
                return (
                    <Fragment>
                        <Button type='ghost'>编辑</Button>
                        <Button type='ghost' style={{ marginLeft: '1vw' }}><Link to={'/ds/dsm/detail/' + record.id}>查看</Link></Button>
                    </Fragment >
                )
            }
        }
    ]

    getData = async () => {
        const response = await reqDataSourceList(sessionStorage.getItem('user_id'))
        if (response.success === 1) {
            const data = response.data.map(item => ({ key: item.id, ...item }))
            this.setState({ data })
        } else {
            message.error(response.errorMessage)
        }
    }

    componentDidMount() {
        this.getData()
    }

    //传给table组件的回调函数
    onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys)
        this.setState({ selectedRowKeys })
    }

    //点击删除按钮的处理，用一个确认对话框
    deleteItems = () => {
        Modal.confirm({
            title: '确定要删除这' + this.state.selectedRowKeys.length + '条数据源吗',
            icon: <ExclamationCircleOutlined />,
            cancelText: '取消',
            okType: 'danger',
            okText: '确认',
            onOk: this.delete
        })
    }

    delete = async () => {
        const response = await reqDeleteDatasources(this.state.selectedRowKeys)
        if (response.success === 1) {
            message.info(response.data)
            this.setState({ selectedRowKeys: [] })
            this.getData()
        } else {
            message.error(response.errorMessage)
        }
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
    addDatasource = async values => {
        const param = {
            ...values,
            isShared: this.state.isShared ? 1 : 0,
            ownerId: sessionStorage.getItem('user_id')
        }
        const response = await reqAddDatasource(param)
        if (response.success === 1) {
            message.info('添加成功')
            this.getData()
        } else {
            message.error(response.errorMessage)
        }
    }

    render() {

        const isDeleteAbled = this.state.selectedRowKeys.length > 0

        const data = this.state.data
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        }

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
                        <Form {...layout} ref='addForm' onFinish={this.addDatasource}>
                            {/* 数据源名称 */}
                            <Form.Item label='数据源名称' name='name'>
                                <Input placeholder='数据源名称' allowClear />
                            </Form.Item>
                            {/* 数据库类型的下拉框 */}
                            <Form.Item label='数据源类型' name='dbType'>
                                <Select placeholder='请选择数据源' style={{ width: '150px' }}>
                                    <Select.Option value='mysql'>MySQL</Select.Option>
                                    <Select.Option value='oracle'>Oracle</Select.Option>
                                    <Select.Option value='sqlserver'>SQL Server</Select.Option>
                                </Select>
                            </Form.Item>
                            {/* 数据库服务器IP */}
                            <Form.Item label='服务器URL:' name='ipAddress'>
                                <Input placeholder='数据库服务器IP或域名' allowClear />
                            </Form.Item>
                            {/* 数据库端口号 */}
                            <Form.Item label='端口号' name='port' >
                                <Input placeholder='数据库端口号' allowClear />
                            </Form.Item>
                            {/* 数据源名称 */}
                            <Form.Item label='数据库名称' name='dbName'>
                                <Input placeholder='数据库名称' allowClear />
                            </Form.Item>
                            {/* 数据库用户名 */}
                            <Form.Item label='用户名' name='username'>
                                <Input placeholder='数据库用户名' allowClear />
                            </Form.Item>
                            {/* 数据库密码 */}
                            <Form.Item label='密码' name='password'>
                                <Input.Password placeholder='数据库密码' allowClear />
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
                            <Button style={{ float: 'right', marginLeft: '1vw' }} onClick={() => {
                                this.setState({ addModalVisable: false })
                                this.setState({ ...initialState })
                            }}>取消</Button>
                            <Button htmlType='submit' style={{ float: 'right' }} type='primary'>添加</Button>
                        </Form>
                    </Modal>
                    <Button className='dsm-header-delete'
                        type='danger' disabled={!isDeleteAbled} icon={<DeleteOutlined />}
                        onClick={this.deleteItems}>
                        {'删除数据源(' + this.state.selectedRowKeys.length + ')'}
                    </Button>
                    <Input.Search className='dsm-header-search' placeholder='搜索数据源名称' onSearch={value => console.log(value)} enterButton />
                </div>

                {/* 数据源管理的主体部分--表格 */}
                <div className='dsm-main'>
                    <Table
                        columns={this.columns}
                        dataSource={data}
                        rowSelection={rowSelection}
                        pagination={{ position: ['bottomCenter'] }}
                        bordered />
                </div>
            </div>
        )
    }
}

class DatasourceDetail extends React.Component {

    state = {
        detail: {}
    }

    getData = async () => {
        const response = await reqDatasourceDetail(this.props.match.params.id)
        if (response.success === 1) {
            this.setState({ detail: response.data })
        } else {
            message.error(response.errorMessage)
        }
    }

    componentDidMount() {
        this.getData()
    }

    render() {

        const record = this.state.detail
        return (
            <Fragment>
                <Descriptions bordered>
                    <Descriptions.Item label="编号" span={1}>
                        {record.id}
                    </Descriptions.Item>
                    <Descriptions.Item label="数据源名称" span={2}>
                        {record.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="数据库类型" span={3}>
                        {record.dbType}
                    </Descriptions.Item>
                    <Descriptions.Item label="数据库服务器ip" span={1}>
                        {record.ipAddress}
                    </Descriptions.Item>
                    <Descriptions.Item label="端口号" span={1}>
                        {record.port}
                    </Descriptions.Item>
                    <Descriptions.Item label="数据库名称" span={1}>
                        {record.dbName}
                    </Descriptions.Item>
                    <Descriptions.Item label="数据库用户名" span={1.5}>
                        {record.username}
                    </Descriptions.Item>
                    <Descriptions.Item label="数据库密码" span={1.5}>
                        {record.password}
                    </Descriptions.Item>
                    <Descriptions.Item label="数据源拥有者" span={2}>
                        {record.ownerId}
                    </Descriptions.Item>
                    <Descriptions.Item label="是否共享" span={1}>
                        {record.isShared ? '是' : '否'}
                    </Descriptions.Item>
                    <Descriptions.Item label="备注" span={3}>
                        {record.comment}
                    </Descriptions.Item>
                </Descriptions>
                <Button type='primary'>
                    <Link to='/ds/dsm/list'>返回</Link>
                </Button>
            </Fragment>
        )
    }
}

export { Datasource, DatasourceManagement }