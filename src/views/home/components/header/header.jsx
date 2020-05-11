import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Dropdown, Avatar } from 'antd'
import { HomeOutlined } from '@ant-design/icons'

import './header.css'

const { Header } = Layout
const { Item } = Menu

function logout() {
    sessionStorage.removeItem('user_id')
    sessionStorage.removeItem('user_name')
}

const rootMenu = (
    <Menu>
        <Item key='1'><Link to='/updatePwd'>修改密码</Link></Item>
        <Item key='2'><Link to='/addAccount'>设置用户</Link></Item>
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
        return (
            <Header className='home-header'>
                <Breadcrumb>
                    <Breadcrumb.Item href='/home'>
                        <HomeOutlined />
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Dropdown overlay={sessionStorage.getItem('user_name')==='root'?rootMenu:userMenu} placement='bottomCenter'>
                <Avatar className='avator' shape='square' size='large'>{sessionStorage.getItem('user_name')}</Avatar>
                </Dropdown>
            </Header>
        )
    }
}