import React from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

//import {login} from '../../../api/apis'

import './login.css'
import { withRouter } from 'react-router-dom'

/**
 * 登陆表单
 */
class LoginForm extends React.Component{
  
  onFinish = values => {
    console.log('接受的参数为:',values)
    // const response = await login(values.username,values.password)
    // console.log("返回结果为:",response)
    sessionStorage.setItem('user_id',values['password'])
    sessionStorage.setItem('user_name',values['username'])
    this.props.history.replace('/')
    
  }

  render(){
    return (
      <Form
        className="login-form"
        onFinish={this.onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="密码"
          />
        </Form.Item>
  
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登陆
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default withRouter(LoginForm)