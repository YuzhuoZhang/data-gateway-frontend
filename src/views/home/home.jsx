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
import DataChanelMange from './components/main/dgm/dcm/dcm'
import Start from './components/homepage'
import DataTypeManage from './components/main/dgm/dtm/dtm'

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
                        title: '数据源管理',
                        url: '/dgm/dsm'
                    },
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
                                {/* <Route path='/dgs/is' component={}/>
                                <Route path='/dgs/dss' component={}/> */}
                                <Route path='/dgm/dsm' component={DataSourceMange}/>
                                <Route path='/dgm/dcm' component={DataChanelMange}/>
                                <Route path='/dgm/dtm' component={DataTypeManage}/>
                                {/* <Route path='/dgm/rcm' component={}/>
                                <Route path='/asp/aspm' component={}/>
                                <Route path='/asp/em' component={}/>
                                <Route path='/asp/spm' component={}/>
                                <Route path='/asp/asl' component={}/> */}
                                <Redirect to='/home'/>
                            </Switch>
                        </Card>
                    </Content>
                    {/* 主体部分的底部 */}
                    <Footer className='home-footer'>
                        底部
                    </Footer>
                </Layout>

            </Layout>
        )
    }
}