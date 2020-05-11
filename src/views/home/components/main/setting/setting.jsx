import React, { Fragment } from 'react'
import { Form, Input, message, Button } from 'antd'
import { reqAddUser,reqUpdatePwd } from '../../../../../api/apis'

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 6 }
}

class UpdatePwd extends React.Component {

    updatePwd = async values=>{
        const response  = await reqUpdatePwd(sessionStorage.getItem('user_id'),values.password1,values.password2)
        if(response.success===1){
            message.info(response.data)
        }else{
            message.error(response.errorMessage)
        }
    }

    render() {
        return (
            <Fragment>
                <Form
                {...layout}
                onFinish={this.updatePwd}>
                    <Form.Item label='原密码' name='password1' rules={[{ required: true, message: '请输入原密码' }]}>
                        <Input.Password placeholder='请输入原密码'/>
                    </Form.Item>
                    <Form.Item label='新密码' name='password2' rules={[{ required: true, message: '请输入新密码' }]}>
                        <Input.Password placeholder='请输入新密码'/>
                    </Form.Item>
                    <Button type='primary' style={{marginLeft:'3vw',width:'10vw'}} htmlType='submit'>修改</Button>
                </Form>
            </Fragment>
        )
    }
}

class AddAccount extends React.Component {

    addAccount = async values => {
        const response = await reqAddUser(values.username, values.password)
        if (response.success === 1) {
            message.info(response.data)
        } else {
            message.error(response.errorMessage)
        }
    }

    render() {
        return (
            <Fragment>
                <Form
                    {...layout}
                    onFinish={this.addAccount}>
                    <Form.Item label='用户名' name='username' rules={[{ required: true, message: '请输入用户名' }]}>
                        <Input placeholder='请输入用户名' />
                    </Form.Item>
                    <Form.Item label='密码' name='password' rules={[{ required: true, message: '请输入用户密码' }]}>
                        <Input.Password placeholder='请输入用户密码' />
                    </Form.Item>
                    <Button type='primary' style={{marginLeft:'3vw',width:'10vw'}} htmlType='submit'>添加</Button>
                </Form>
            </Fragment>
        )
    }
}

export { UpdatePwd, AddAccount }