import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Dropdown, Avatar } from 'antd'
import { HomeOutlined } from '@ant-design/icons'

import './header.css'

const { Header } = Layout
const { Item } = Menu

const breadcrumbNameMap = {
    '/dgs': ['网关查询'],
    '/dgs/is': ['网关查询', '索引查询'],
    '/dgs/dss': ['网关查询', '数据源查询'],
    '/dgm': ['网关管理'],
    '/dgm/dcm': ['网关管理', '数据通道管理'],
    '/dgm/dtm': ['网关管理', '数据类型转换维护'],
    '/dgm/rcm': ['网关管理', '行列置换预案维护'],
    '/asp': ['自动服务计划'],
    '/asp/aspm': ['自动服务计划', '自动服务参数维护'],
    '/asp/em': ['自动服务计划', '异常报警短信设置'],
    '/asp/spm': ['自动服务计划', '服务计划管理'],
    '/asp/log': ['自动服务计划', '自动服务时间日志']
}

function logout() {
    sessionStorage.removeItem('user_id')
    sessionStorage.removeItem('user_name')
}

const rootMenu = (
    <Menu>
        <Item key='1'><Link to='/updatePwd'>修改密码</Link></Item>
        <Item key='2'><Link to='settingUser'>设置用户</Link></Item>
        <Item key='3'><Link to='/login' onClick={logout}>退出登陆</Link></Item>
    </Menu>
)
const userMenu = (
    <Menu>
        <Item key='1'><Link to='/updatePwd'>修改密码</Link></Item>
        <Item key='3'><Link to='/login' onClick={logout}>退出登陆</Link></Item>
    </Menu>
)

export default class HomeHeader extends React.Component {

    render() {
        //从父组件中拿到当前的url
        const { url } = this.props
        //得到面包屑的数组--这个方案真独特，不知道有没有第二个人这么写
        const breadcrumbItems = breadcrumbNameMap[url]

        return (
            <Header className='home-header'>

                <Breadcrumb>
                    <Breadcrumb.Item href='/home'>
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    {
                        (url, breadcrumbItems) => {
                            if (!url) {
                                breadcrumbItems.map(item => (
                                    <Breadcrumb.Item >
                                        {item}
                                    </Breadcrumb.Item>
                                ))
                            }
                        }
                    }
                </Breadcrumb>

                <Dropdown overlay={sessionStorage.getItem('user_name')=='root'?rootMenu:userMenu} placement='bottomCenter'>
                <Avatar className='avator' shape='square' size='large'>{sessionStorage.getItem('user_name')}</Avatar>
                </Dropdown>


            </Header>
        )
    }
}