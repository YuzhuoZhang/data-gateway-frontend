import React from 'react'
import { Layout,Menu } from 'antd'
import {Link} from 'react-router-dom'

const { Sider } = Layout
const {SubMenu, Item} = Menu

//功能菜单，通过接受功能列表对象，解析出一个多级的可以折叠的功能列表
export default class FuncMenu extends React.Component {

    //sider的默认折叠效果
    state = {
        collapsed: false
    }

    //点击折叠的触发的函数
    onCollapse = collapsed => {
        this.setState({ collapsed })
    }
    // 渲染


    render() {

        const { menus } = this.props
        return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>

                <Menu theme='dark' mode='inline'>
                    {
                        menus.map(i => (
                            <SubMenu key={i['url']} title={<span>{i['icon']}<span>{i['title']}</span></span>}>
                                {i['subMenu'].map(sm => (
                                    <Item key={sm['url']}>
                                        <Link to={sm['url']} >
                                            {sm['title']}
                                        </Link>
                                    </Item>
                                ))}
                            </SubMenu>
                        ))
                    }
                </Menu>
            </Sider>
        )
    }
}