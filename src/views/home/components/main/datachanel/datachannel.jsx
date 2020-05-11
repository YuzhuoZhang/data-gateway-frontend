import React, { Fragment } from 'react'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import {
    Button,
    Input,
    Tag,
    Form,
    Modal,
    Descriptions
} from 'antd'
import {
    Switch,
    Route,
    Redirect,
    Link
} from 'react-router-dom'
import './datachannel.css'
import MyTable from '../table'

const columns = [
    {
        'title': '任务编号',
        'dataIndex': 'id',
        'key': 'id'
    },
    {
        'title': '方案编号',
        'dataIndex': 'schemeId',
        'key': 'schemeId'
    },
    {
        'title': '开始时间',
        'dataIndex': 'start',
        'key': 'start'
    },
    {
        'title': '执行间隔(s)',
        'dataIndex': 'interval',
        'key': 'interval'
    },
    {
        'title': '状态',
        'dataIndex': 'state',
        'key': 'state',
        render: value => (
            value ? <Tag color='green'>正在执行</Tag> : <Tag color='red'>未执行</Tag>
        )

    },
    {
        'title': '操作',
        'dataIndex': 'action',
        'key': 'action',
        render: (_, record) => {
            return (<Fragment>
                <Button type='ghost' disabled={record.state} onClick={() => { console.log(record.id) }} style={{ marginLeft: '2vw' }}>执行</Button>
            </Fragment>)
        }
    }
]

const data = [
    {
        id: 1,
        schemeId: 1,
        start: '2020-3-24',
        interval: '3600',
        state: true
    },
    {
        id: 2,
        schemeId: 1,
        start: '2020-3-24',
        interval: '3600',
        state: true
    }
]

class TaskMangement extends React.Component {

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

    render() {

        const isDeleteAbled = this.state.selectedRowKeys.length > 0

        return (
            <Fragment>
                <div className='task-header'>
                    <Button
                        className='add-task-button'
                        type='primary'
                        icon={<PlusOutlined />}
                        onClick={this.openAddTaskModal}>
                        新建任务
                    </Button>

                    <Button className='delete-task-button'
                        type='danger' disabled={!isDeleteAbled} icon={<DeleteOutlined />}
                        onClick={this.deleteItems}>
                        {'删除任务(' + this.state.selectedRowKeys.length + ')'}
                    </Button>
                    <Input.Search className="task-search" enterButton placeholder='搜索任务编号' />
                </div>
                <div className='task-main'>
                    <MyTable onSelectChange={this.onSelectChange} columns={columns} dataSource={data} />
                </div>
            </Fragment>
        )
    }
}

class DataChannelMange extends React.Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route path='/dc/dcm/list' component={DataChannel} />
                    <Route path='/dc/dcm/detail/:id' component={DataChannelDetail} />
                    <Redirect to='/dc/dcm/list' />
                </Switch>
            </Fragment>
        )
    }
}

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
}

class DataChannel extends React.Component {
    state = {
        selectedRowKeys: [],
        isShared: false,
        editModal: false,
        row: null,
        addModalVisable: false,
    }

    columns = [
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
            'dataIndex': 'sourceId',
            'key': 'sourceId'
        },
        {
            'title': '输出数据源',
            'dataIndex': 'targetId',
            'key': 'targetId'
        },
        {
            'title': '操作',
            'dataIndex': 'action',
            'key': 'action',
            render: (text,record) => {
                return (<Fragment>
                    <Button type='ghost'>编辑</Button>
                    <Button type='ghost' style={{ marginLeft: '2vw' }}>
                        <Link to={'/dc/dcm/detail/'+record.id}>查看</Link>
                    </Button>
                </Fragment>)
            }
        }
    ]

    //传给table组件的回调函数
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys })
    }

    openAddModal = () => {
        this.setState({ addModalVisable: true })
    }

    render() {

        const isDeleteAbled = this.state.selectedRowKeys.length > 0

        return (
            // 数据转换通道管理
            <Fragment>
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
                    <Input.Search className="dcm-header-search" enterButton placeholder='搜索方案编号' />
                </div>
                {/* 数据转换通道主体表格部分 */}
                <div className='dcm-main'>
                    <MyTable onSelectChange={this.onSelectChange} columns={this.columns} dataSource={data} />
                </div>
            </Fragment>
        )
    }
}

class DataChannelDetail extends React.Component {

    state = {
        detail: {}
    }

    render() {

        const { detail } = this.state

        return (
            <Fragment>
                <Descriptions bordered>
                    <Descriptions.Item label='编号' span={1}>
                        {detail.id}
                    </Descriptions.Item>
                    <Descriptions.Item label='通道名称' span={2}>
                        {detail.name}
                    </Descriptions.Item>
                    <Descriptions.Item label='源数据源编号' span={1.5}>
                        {detail.sourceId}
                    </Descriptions.Item>
                    <Descriptions.Item label='源数据源表' span={1.5}>
                        {detail.sourceTableName}
                    </Descriptions.Item>
                    <Descriptions.Item label='源数据源列' span={3}>
                        {detail.sourceTableCols}
                    </Descriptions.Item>
                    <Descriptions.Item label='目标数据源编号' span={1.5}>
                        {detail.targetId}
                    </Descriptions.Item>
                    <Descriptions.Item label='目标数据源表' span={1.5}>
                        {detail.targetTableName}
                    </Descriptions.Item>
                    <Descriptions.Item label='目标数据源列' span={3}>
                        {detail.targetTableCols}
                    </Descriptions.Item>
                </Descriptions>
                <Button style={{ marginTop: '2vh' }} type='primary'><Link to='/dc/dcm/list'>返回</Link></Button>
            </Fragment>
        )
    }
}

export { TaskMangement, DataChannelMange }