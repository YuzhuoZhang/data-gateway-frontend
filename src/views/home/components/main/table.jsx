import React from 'react'
import {Table} from 'antd'

/**
 * 定义一下自己的图表
 */
export default class MyTable extends React.Component{
    render(){
        const { dataSource, columns, rowSelection } = this.props
        return (
            <Table 
                dataSource={dataSource} 
                columns={columns}
                rowSelection={rowSelection}
                bordered      
            />
        )
    }
}