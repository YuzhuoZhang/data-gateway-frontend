import React,{Component} from 'react'
import {Input,Form,Icon,Button} from 'antd'

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginForm extends Component{
    
    componentDidMount(){
        //初试化的时候禁用登录按钮
        this.props.form.validateFields();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(
            (err,values)=>{
                if(!err){
                    console.log('表单的参数为:',values)
                }
            }
        )
    }
    
    render(){

        const {getFieldDecorator,getFieldsError,getFieldError,isFieldTouched} = this.props.form

        //仅在字段被点击后显示错误
        const usernameError = isFieldTouched('username')&&getFieldError('username')
        const passwordError = isFieldTouched('password')&&getFieldError('password')

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item validateStatus={usernameError?'error':''} help={usernameError||''}>
                    {
                        getFieldDecorator('username',{
                            rules:[{required:true,message:'请输入用户名'}]
                        })(
                            <Input
                                prefix={<Icon type='user' style={{color:'rgbaa(0,0,0,.25)'}}/>}
                                placeholder='用户名'
                            />
                        )
                    }
                </Form.Item>
                <Form.Item validateStatus={passwordError?'error':''} help={passwordError||''}>
                    {
                        getFieldDecorator('password',{
                            rules:[{required:true,message:'请输入密码'}]
                        })(
                            <Input.Password
                                prefix={<Icon type='lock' style={{color:'rgbaa(0,0,0,.25)'}}/>}
                                placeholder='密码'
                            />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit' disabled={hasErrors(getFieldsError())}>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        )

    }
}

export const WrappedLoginForm = Form.create({name:'login'})(LoginForm)