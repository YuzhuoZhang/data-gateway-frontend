import ajax from './ajax'

//服务器的url以及端口
const BASE = 'http://localhost:8888'

export const login=(username,password)=>ajax(BASE+'/api/user/logIn',{username,password},'POST')