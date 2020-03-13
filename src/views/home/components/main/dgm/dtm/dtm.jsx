import React from 'react'
import { Button, Modal, Select, Form, Input } from 'antd'
import { SyncOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'

import MyTable from '../../table'

const { Option } = Select
//数据源表格表头
const columns = [
    {
        'title': '源数据库',
        'dataIndex': 'source',
        'key': 'source'
    },
    {
        'title': '源数据类型',
        'dataIndex': 'sourceType',
        'key': 'sourceType'
    },
    {
        'title': '目标数据库',
        'dataIndex': 'target',
        'key': 'target'
    },
    {
        'title': '目标数据类型',
        'dataIndex': 'targetType',
        'key': 'targetType',
    }
]
//新增数据类型转换的布局
const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 10 },
}
/**
 * 数据类型装换管理组件
 * 其实都长得差不多
 */
export default class DataTypeManage extends React.Component {

    /**
     * 组件自己的状态
     *     选中的行的key
     *     是否展示新增对话框
     */
    state = {
        selectedRowKeys: [],
        showModal: false
    }

    //传给table组件的回调函数
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys })
    }

    render() {
        return (
            <div className='dtm'>
                {/* 上面的几个功能按钮 */}
                <div className='dtm-header'>
                    {/* 新增类型转换映射 */}
                    <Button
                        icon={<PlusOutlined />}
                        type='primary'
                        onClick={()=>this.setState({showModal:true})}>
                        新建类型转换映射
                    </Button>
                    {/* 新建类型转换的映射的对话框 */}
                    <Modal
                        visible={this.state.showModal}
                        centered={true}
                        closable={false}
                        footer={null}
                        destroyOnClose
                        forceRender={true}>
                        {/* 新建xxx的表单 */}
                        <Form {...layout}>
                            {/* 源数据库 */}
                            <Form.Item name='source' label='源数据库'>
                                <Select placeholder='请选择源数据源'>
                                    <Option value='mysql'>
                                        MySQL
                                    </Option>
                                    <Option value='oracle'>
                                        Oracle
                                    </Option>
                                    <Option value='sqlserver'>
                                        SQL Server
                                    </Option>
                                    <Option value='excel'>
                                        Excel
                                    </Option>
                                </Select>
                            </Form.Item>
                            {/* 源数据类型 */}
                            <Form.Item name='sourceType' label='源数据类型'>

                            </Form.Item>
                            {/* 目标数据库 */}
                            <Form.Item name='target' label='目标数据库'>
                                <Select placeholder='请选择目标数据库'>
                                    <Option value='mysql'>
                                        MySQL
                                    </Option>
                                    <Option value='oracle'>
                                        Oracle
                                    </Option>
                                    <Option value='sqlserver'>
                                        SQL Server
                                    </Option>
                                    <Option value='excel'>
                                        Excel
                                    </Option>
                                </Select>
                            </Form.Item>
                            {/* 目标数据类型 */}
                            <Form.Item name='targetType' label='目标数据类型'>

                            </Form.Item>
                            {/* 备注 */}
                            <Form.Item name='comment' label='备注'>
                                <Input allowClear placeholder='描述信息' />
                            </Form.Item>
                        </Form>
                    </Modal>
                    {/* 删除数据类型转换映射 */}
                    <Button
                        style={{ marginLeft: '1.5vw' }}
                        icon={<DeleteOutlined />}
                        type='danger'>
                        删除类型转换映射
                    </Button>
                    {/* 刷新表格 */}
                    <Button
                        type='primary'
                        style={{ float: 'right' }}
                        icon={<SyncOutlined spin={true} />}
                        loading>
                        刷新
                    </Button>
                </div>
                {/* 主体表格部分 */}
                <div className='dtm-main' style={{ marginTop: '2vh' }}>
                    <MyTable onSelectChange={this.onSelectChange} columns={columns} />
                </div>
            </div>
        )
    }
}