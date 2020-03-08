import React from 'react'
import { Redirect } from 'react-router-dom'
import { Layout } from 'antd'

import './home.css'

const { Header, Content, Footer, Sider } = Layout

export default class Home extends React.Component{
    render(){
        return (
            <Layout>
                <Header className='home-header'>头部</Header>
                <Layout className='home-main'>
                    <Sider>侧栏</Sider>
                    <Content>主体内容</Content>
                </Layout>
                <Footer className='home-footer'>底部</Footer>
            </Layout>
        )
    }
}