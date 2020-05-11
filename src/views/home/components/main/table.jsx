import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

/**
 * 定义一下自己的图表
 */
export default class MyTable extends React.Component {

    render() {
        const { dataSource, columns } = this.props

        const rowSelection= {
            selectedRowKeys:this.props.selectedRowKeys,
            onChange: this.props.onSelectChange
        }
        return (
            <Table
                dataSource={dataSource}
                columns={columns}
                rowSelection={rowSelection}
                pagination={{ position: ['bottomCenter'] }}
                bordered
            />
        )
    }
}

MyTable.propTypes = {
    dataSource: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired
}