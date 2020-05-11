import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout, Card } from 'antd'
import {
    FileSearchOutlined,
    SettingOutlined
} from '@ant-design/icons'


import './home.css'
import HomeHeader from './components/header/header'
import Start from './components/homepage'
import SideBar from './components/sider/sider'

import { Datasource, DatasourceManagement } from './components/main/datasource/datasource'
import DataSourceMange from './components/main/dgm/dsm/dsm'
import DataChannelMange from './components/main/dgm/dcm/dcm'
import { TaskMangement } from './components/main/datachanel/datachanel'
import { AddAccount, UpdatePwd } from './components/main/setting/setting'

const { Content, Footer } = Layout
/**
 * 整个项目的主页 Home页
 * 渲染前会从sessionStorage中拿用户数据
 * 如果拿不到证明没有登陆，则直接跳转到登陆界面
 */
export default class Home extends React.Component {

    render() {

        let user_id = sessionStorage.getItem('user_id')
        let user_name = sessionStorage.getItem('user_name')
        if (!(user_id && user_name)) {
            return <Redirect to='/login' />
        }

        const menus = [
            {
                'title': '数据源',
                'url': '/ds',
                'icon': <FileSearchOutlined />,
                'subMenu': [
                    {
                        title: '查看数据源',
                        url: '/ds/ds'
                    },
                    {
                        title: '数据源管理',
                        url: '/ds/dsm'
                    }
                ]
            },
            {
                'title': '数据通道',
                'url': '/dc',
                'icon': <SettingOutlined />,
                'subMenu': [
                    {
                        title: '数据通道管理',
                        url: '/dc/dcm'
                    },
                    {
                        title: '任务管理',
                        url: '/dc/task'
                    },
                ]
            }
        ]

        return (
            <Layout>
                {/*sider 功能列表*/}
                <SideBar menus={menus} />
                {/* 主体界面 */}
                <Layout className='home-main'>
                    {/* 主体界面的头部 */}
                    <HomeHeader />
                    {/* 主体界面的主体部分 */}
                    <Content className='home-content'>
                        {/* 用一张卡片承载主体部分 */}
                        <Card className='card' hoverable={false}>
                            {/* 主体部分的路由 */}
                            <Switch>
                                <Route path='/home' component={Start} />
                                <Route path='/ds/ds' component={Datasource} />
                                <Route path='/ds/dsm' component={DatasourceManagement} />
                                <Route path='/dc/dcm' component={DataChannelMange} />
                                <Route path='/dc/task' component={TaskMangement} />
                                <Route path='/addAccount' component={AddAccount} />
                                <Route path='/updatePwd' component={UpdatePwd} />
                                <Redirect to='/home' />
                            </Switch>
                        </Card>
                    </Content>
                    {/* 主体部分的底部 */}
                    <Footer className='home-footer'>
                        Data Gateway
                    </Footer>
                </Layout>

            </Layout>
        )
    }
}