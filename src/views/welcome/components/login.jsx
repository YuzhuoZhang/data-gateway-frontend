import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import './login.css'
import { withRouter } from 'react-router-dom'
import { reqLogin } from '../../../api/apis'

/**
 * 登陆表单
 */
class LoginForm extends React.Component{
  
  onFinish = async values => {
    console.log('接受的参数为:',values)
    const response = await reqLogin(values.username,values.password)
    if(response.success===1){
      let user = response.data
      sessionStorage.setItem('user_id',user.id)
      sessionStorage.setItem('user_name',user.username)
      this.props.history.replace('/')
    }else{
      message.error(response.errorMessage)
    }
    
    
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
          <Input prefix={<UserOutlined />} placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
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