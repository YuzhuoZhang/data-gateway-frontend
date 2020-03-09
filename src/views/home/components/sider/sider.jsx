import React from 'react'
import { Layout,Menu } from 'antd'
import {Link} from 'react-router-dom'

const { Sider } = Layout
const {SubMenu, Item} = Menu

export default class FuncMenu extends React.Component {

    state = {
        collapsed: false
    }

    onCollapse = collapsed => {
        this.setState({ collapsed })
    }

    render() {

        const {menus} = this.props
        return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>

                <Menu theme='dark' mode='inline'>
                    {
                        menus.map(i => (
                            <SubMenu key={i['url']} title={<span>{i['icon']}<span>{i['title']}</span></span>}>
                                {i['subMenu'].map(sm => (
                                    <Item key={sm['url']}>
                                        <Link to={sm['url']}>
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