import React from 'react'
import { Redirect ,Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
    FileSearchOutlined,
    SettingOutlined,
    EditOutlined
  } from '@ant-design/icons'

import './home.css'

const { Header, Content, Footer, Sider } = Layout
const {SubMenu, Item} = Menu

export default class Home extends React.Component{

    state={
        collapsed: false
    }

    onCollapse= collapsed => {
        this.setState({ collapsed })
    }

    render(){
        return (
            <Layout>

                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <Menu theme='dark' mode='inline'>
                        <SubMenu
                            key='ds'
                            title={
                                <span>
                                    <FileSearchOutlined/>
                                    <span>网关查询</span>
                                </span>
                            }
                        >
                            <Item key='1'><Link to='/login'>索引查询</Link></Item>
                            <Item key='2'><Link to=''>数据源查询</Link></Item>
                        </SubMenu>
                        <SubMenu
                            key='gm'
                            title={
                                <span>
                                    <SettingOutlined />
                                    <span>网关管理</span>
                                </span>
                            }
                        >
                            <Item key='3'>数据通道管理</Item>
                            <Item key='4'>数据类型转换维护</Item>
                            <Item key='5'>行列置换预案维护</Item>
                        </SubMenu>
                        <SubMenu
                            key='ap'
                            title={
                                <span>
                                    <EditOutlined />
                                    <span>自动服务计划</span>
                                </span>
                            }
                        >
                            <Item key='6'>自动服务参数维护</Item>
                            <Item key='7'>异常报警短信设置</Item>
                            <Item key='8'>服务计划管理</Item>
                            <Item key='9'>自动服务时间日志</Item>
                        </SubMenu>
                    </Menu>
                </Sider>

                <Layout className='home-main'>

                    <Header className='home-header'>
                        头部
                    </Header>

                    <Content className='home-content'>
                        主体内容
                    </Content>

                    <Footer className='home-footer'>
                        底部
                    </Footer>

                </Layout>
                
            </Layout>
        )
    }
}