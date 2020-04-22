import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout, Card } from 'antd'
import {
    FileSearchOutlined,
    SettingOutlined,
    EditOutlined
} from '@ant-design/icons'


import './home.css'
import HomeHeader from './components/header/header'
import FuncMenu from './components/sider/sider'
import DataSourceMange from './components/main/dgm/dsm/dsm'
import DataChannelMange from './components/main/dgm/dcm/dcm'
import Start from './components/homepage'
import DataTypeManage from './components/main/dgm/dtm/dtm'
import RowColMange from './components/main/dgm/rcm/rcm'
import DataSourceSearch from './components/main/dgs/dss/dss'

const { Content, Footer } = Layout
/**
 * 整个项目的主页 Home页
 * 渲染前会从sessionStorage中拿用户数据
 * 如果拿不到证明没有登陆，则直接跳转到登陆界面
 */
export default class Home extends React.Component {


    state={
        url:''
    }

    render() {

        let user_id = sessionStorage.getItem('user_id')
        let user_name = sessionStorage.getItem('user_name')
        if(!(user_id&&user_name)){
            return <Redirect to='/login'/>
        }
  
        const menus = [
            {
                'title': '数据源管理',
                'url': '/dgs',
                'icon': <FileSearchOutlined />,
                'subMenu': [
                    {
                        title: '查看数据源',
                        url: '/dgs/dss'
                    },
                    {
                        title: '修改数据源',
                        url: '/dgm/dsm'
                    }
                ]
            },
            {
                'title': '数据通道管理',
                'url': '/dgm',
                'icon': <SettingOutlined />,
                'subMenu': [
                    // {
                    //     title: '数据通道',
                    //     url: ''
                    // },
                    {
                        title: '数据通道管理',
                        url: '/dgm/dcm'
                    },
                    {
                        title: '定时执行任务',
                        url: '/dgm/dtm'
                    },
                    // {
                    //     title: '行列置换预案维护',
                    //     url: '/dgm/rcm'
                    // }
                ]
            }
        ]

        const {url} = this.state

        return (
            <Layout>
                {/*sider 功能列表*/}
                <FuncMenu menus={menus} />
                {/* 主体界面 */}
                <Layout className='home-main'>
                    {/* 主体界面的头部 */}
                    <HomeHeader url={url} />
                    {/* 主体界面的主体部分 */}
                    <Content className='home-content'>
                        {/* 用一张卡片承载主体部分 */}
                        <Card className='card' hoverable={false}>
                            {/* 主体部分的路由 */}
                            <Switch>
                                <Route path='/home' component={Start}/>
                                <Route path='/updatePwd' component={}/>
                                <Route path='/dgs/dss' component={DataSourceSearch}/>
                                <Route path='/dgm/dsm' component={DataSourceMange}/>
                                <Route path='/dgm/dcm' component={DataChannelMange}/>
                                <Route path='/dgm/dtm' component={DataTypeManage}/>
                                <Route path='/dgm/rcm' component={RowColMange}/>
                                <Redirect to='/home'/>
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