import React from 'react'
import { Redirect, Link, Switch } from 'react-router-dom'
import { Layout, Menu, Card } from 'antd'
import {
    FileSearchOutlined,
    SettingOutlined,
    EditOutlined
} from '@ant-design/icons'

import './home.css'
import HomeHeader from './components/header/header'
import FuncMenu from './components/sider/sider'

const { Content, Footer } = Layout

export default class Home extends React.Component {

    render() {

        let user_id = sessionStorage.getItem('user_id')
        let user_name = sessionStorage.getItem('user_name')
        if(!(user_id&&user_name)){
            return <Redirect to='/login'/>
        }
  
        const menus = [
            {
                'title': '网关查询',
                'url': '/dgs',
                'icon': <FileSearchOutlined />,
                'subMenu': [
                    {
                        title: '索引查询',
                        url: '/dgs/is'
                    },
                    {
                        title: '数据源查询',
                        url: '/dgs/dss'
                    }
                ]
            },
            {
                'title': '网关管理',
                'url': '/dgm',
                'icon': <SettingOutlined />,
                'subMenu': [
                    {
                        title: '数据通道管理',
                        url: '/dgm/dcm'
                    },
                    {
                        title: '数据类型转换维护',
                        url: '/dgm/dtm'
                    },
                    {
                        title: '行列置换预案维护',
                        url: '/dgm/rcm'
                    }
                ]
            },
            {
                'title': '自动服务计划',
                'url': '/asp',
                'icon': <EditOutlined />,
                'subMenu': [
                    {
                        title: '自动服务参数维护',
                        url: '/asp/aspm'
                    },
                    {
                        title: '异常报警短信设置',
                        url: '/asp/em'
                    },
                    {
                        title: '服务计划管理',
                        url: '/asp/spm'
                    },
                    {
                        title: '自动服务时间日志',
                        url: '/asp/log'
                    }
                ]
            }
        ]

        return (
            <Layout>

                <FuncMenu menus={menus}/>

                <Layout className='home-main'>

                    <HomeHeader />

                    <Content className='home-content'>
                        <Card className='card' hoverable={false}>
                            {/* <Switch>
                                <Route path='/home' component={}/>
                                <Route path='/dgs/is' component={}/>
                                <Route path='/dgs/dss' component={}/>
                                <Route path='/gm/dcm' component={}/>
                                <Route path='/gm/dtm' component={}/>
                                <Route path='/gm/rcm' component={}/>
                                <Route path='/asp/aspm' component={}/>
                                <Route path='/asp/em' component={}/>
                                <Route path='/asp/spm' component={}/>
                                <Route path='/asp/log' component={}/>
                                <Redirect to='/home'/>
                            </Switch> */}
                        </Card>
                    </Content>

                    <Footer className='home-footer'>
                        底部
                    </Footer>

                </Layout>

            </Layout>
        )
    }
}