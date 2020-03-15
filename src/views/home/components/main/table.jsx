import React from 'react'
import PropTypes  from 'prop-types'
import { Table } from 'antd'

/**
 * 定义一下自己的图表
 */
export default class MyTable extends React.Component {

    state = {
        rowSelection: {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.props.onSelectChange(selectedRowKeys)
            }
            // ,
            // onSelect: (record, selected, selectedRows) => {
            //     console.log(record, selected, selectedRows);
            // }
        }
    }

    render() {
        const { dataSource, columns } = this.props
        return (
            <Table
                dataSource={dataSource}
                columns={columns}
                rowSelection={this.state.rowSelection}
                bordered
            />
        )
    }
}

MyTable.propTypes={
    dataSource: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired
}