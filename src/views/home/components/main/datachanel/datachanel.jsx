import React, { Fragment } from 'react'
import './datachanel.css'
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Input,Tag } from 'antd'

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
        render:value=>(
            value?<Tag color='green'>正在执行</Tag>:<Tag color='red'>未执行</Tag>
        )
            
    },
    {
        'title': '操作',
        'dataIndex': 'action',
        'key': 'action',
        render: (_,record)=>{
            return (<Fragment>
                <Button type='ghost' disabled={record.state} onClick={()=>{console.log(record.id)}} style={{marginLeft:'2vw'}}>执行</Button>
            </Fragment>)
        }
    }
]

const data = [
    {
        id:1,
        schemeId:1,
        start:'2020-3-24',
        interval:'3600',
        state:true
    },
    {
        id:2,
        schemeId:1,
        start:'2020-3-24',
        interval:'3600',
        state:true
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
                    <Input.Search className="task-search" enterButton placeholder='搜索任务编号'/>
                </div>
                <div className='task-main'>
                    <MyTable onSelectChange={this.onSelectChange} columns={columns} dataSource={data}/>
                </div>
            </Fragment>
        )
    }
}

class DataChanel extends React.Component {
    render() {
        return (
            <Fragment>

            </Fragment>
        )
    }
}

export { TaskMangement }