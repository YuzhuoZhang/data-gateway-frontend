import ajax from './ajax'

//服务器的url以及端口
const BASE = '/api'

export const login=(username,password)=>ajax(BASE+'/user/logIn',{username,password},'POST')