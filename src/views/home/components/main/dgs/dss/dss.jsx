import React from 'react'
import { DatabaseOutlined, TableOutlined, DownSquareOutlined } from '@ant-design/icons'
import { Tree } from 'antd'
import './dss.css'

// 主体部分左侧属性列表的值
const treeData = [
    {
        title: 'mysql数据库',
        key: '0',
        icon: <DatabaseOutlined/>,
        children:[
            {
                title: '表格1',
                key: '0-0',
                icon: <TableOutlined/>
            },
            {
                title: '表格2',
                key: '0-1',
                icon: <TableOutlined/>
            },
            {
                title: '表格3',
                key: '0-2',
                icon: <TableOutlined/>
            }
        ]
    },
    {
        title: 'oracle数据库',
        key: '1',
        icon: <DatabaseOutlined/>,
        children:[
            {
                title: '表格1',
                key: '1-0',
                icon: <TableOutlined/>
            },
            {
                title: '表格2',
                key: '1-1',
                icon: <TableOutlined/>
            },
            {
                title: '表格3',
                key: '1-2',
                icon: <TableOutlined/>
            }
        ]
    }
]

export default class DataSourceSearch extends React.Component{
    render(){
        return (
            // 数据源检索界面
            <div className='dss'>
                {/* 一如既往的头部 */}
                <div className='dss-header'>

                </div>
                {/* 一如既往的主体部分 */}
                <div className='dss-main'>
                    {/* 左侧数据源列表 */}
                    <Tree 
                        treeData={treeData}
                        showIcon={true}
                        switcherIcon={<DownSquareOutlined style={{fontSize:'18px'}}/>}/>
                    {/* 右侧表格查看数据---嗨~可视化的方式查看数据库中数据咯 */}
                </div>
            </div>
        )
    }
}