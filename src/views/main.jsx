import React from 'react'
import { Layout, Menu, Breadcrumb, Icon,Avatar, Empty } from 'antd'
import { NavLink,Route,Switch, Redirect } from 'react-router-dom'
import 'antd/dist/antd.css'
import avator from '../assets/images/avator.jpg'
import DataChanel from '../components/dg-manage/data-chanel'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

export default class SiderDemo extends React.Component {

  state = {
    collapsed: false,
    menus:[
        {
          title: '网关查询',
          key:1,
          iconType: 'file-search',
          items:[
            {
              title:'索引查询',
              key:2,
              to:'/home/dgs/index-search'
            },
            {
              title:'数据源查询',
              key:3,
              to:'/home/dgs/datasource-search'
            }
          ]
          
        },
        {
          title: '网关管理',
          key:4,
          iconType: 'control',
          items:[
            {
              title:'数据通道管理',
              key:5,
              to:'/home/dgm/dcm'
            },
            {
              title:'数据类型转换',
              key:6,
              to:'/home/dgm/dtt'
            },
            {
              title:'行列置换',
              key:7,
              to:'/home/dgm/clr'
            }
          ]
        },
        {
          title: '自动服务计划',
          key:8,
          iconType: 'clock-circle',
          items:[
            {
              title:'服务计划管理',
              key:9,
              to:'/home/dgm/dct'
            },
            {
              title:'服务参数维护',
              key:10,
              to:'/home/dgm/dct'
            },
            {
              title:'服务事件日志',
              key:11,
              to:'/home/dgm/dct'
            }
          ]
        }
    ]
  }

  onCollapse = collapsed => {
    console.log(collapsed)
    this.setState({ collapsed })
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div style={{float:'left'}} >
            <Avatar shape='square' src={avator} size='large'/>
            {/* <span style={{color:'white',fontSize:50,textAlign:'center'}}>&nbsp;&nbsp;&nbsp;Z</span> */}
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {
              this.state.menus.map((menu)=>(
                <SubMenu 
                key={menu.key}
                title={
                  <span> 
                    <Icon type={menu.iconType}/>
                    <span>{menu.title}</span>
                  </span>
                }>
                  {menu.items.map((item)=>(
                    <Menu.Item key={item.key}><NavLink to={item.to}>{item.title}</NavLink></Menu.Item>
                  ))}
                </SubMenu>
              ))
            }
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>网关查询</Breadcrumb.Item>
              <Breadcrumb.Item>索引查询</Breadcrumb.Item>
            </Breadcrumb>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            hello
            <div>
              <Switch>
                <Route path='/home/dgm/dcm' component={<DataChanel />}/>
                {/* <Redirect to='/home/dgm/dcm'/> */}
              </Switch>
            </div>
            
          </Content>
          <Footer style={{ textAlign: 'center' }}>data-gateway</Footer>
        </Layout>
      </Layout>
    );
  }
}