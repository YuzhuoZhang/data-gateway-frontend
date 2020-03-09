import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import {Layout, Menu, Breadcrumb, Dropdown, Avatar} from 'antd'
import { HomeOutlined } from '@ant-design/icons'

import './header.css'

const {Header} = Layout
const {Item} = Menu

const breadcrumbNameMap = {
    '/dgs': '网关查询',
    '/dgs/is': '索引查询',
    '/dgs/dss': '数据源查询',
    '/dgm': '网关管理',
    '/dgm/dcm': '数据通道管理',
    '/dgm/dtm': '数据类型转换维护',
    '/dgm/rcm': '行列置换预案维护',
    '/asp': '自动服务计划',
    '/asp/aspm': '自动服务参数维护',
    '/asp/em': '异常报警短信设置',
    '/asp/spm': '服务计划管理',
    '/asp/log': '自动服务时间日志'
}

function logout(){
    sessionStorage.removeItem('user_id')
    sessionStorage.removeItem('user_name')
}

const userMenu = (
    <Menu>
        <Item key='1'><Link to=''>上传头像</Link></Item>
        <Item key='2'><Link to=''>修改密码</Link></Item>
        <Item key='3'><Link to=''>设置用户</Link></Item>
        <Item key='4'><Link to='/login' onClick={logout}>退出登陆</Link></Item>
    </Menu>
)

const breadcrumbItems = withRouter(props => {
    const { location } = props
    debugger
    const pathSnippets = location.pathname.split('/').filter(i => i)
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
      return (
        <Breadcrumb.Item key={url}>
          {breadcrumbNameMap[url]}
        </Breadcrumb.Item>
      )
    })
    const breadcrumbItems = [
        <Breadcrumb.Item href='/home'>
          <HomeOutlined />
        </Breadcrumb.Item>
      ].concat(extraBreadcrumbItems)

    return breadcrumbItems
})

export default class HomeHeader extends React.Component {

    state={
        breadcrumbItems
    }

    render() {
        return (
            <Header className='home-header'>

                <Breadcrumb>
                    {this.state.breadcrumbItems}
                </Breadcrumb>

                <Dropdown overlay={userMenu} placement='bottomCenter'>
                    <Avatar className='avator' shape='square' size='large'>Root</Avatar>
                </Dropdown>


            </Header>
        )
    }
}