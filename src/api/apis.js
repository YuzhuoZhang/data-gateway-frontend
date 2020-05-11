import ajax from './ajax'

//服务器的url以及端口
const BASE = '/api'

export const reqLogin = (username, password) => ajax(BASE + '/user/logIn', { username, password }, 'POST')

export const reqAddUser = (username, password) => ajax(BASE + '/user/addUser', { username, password }, 'POST')

export const reqUpdatePwd = (id, password1, password2) => ajax(BASE + '/user/updatePwd', { id, password1, password2 }, 'POST')

export const reqAddDatasource = params => ajax(BASE + '/ds/addDataSource', params)

export const reqDataSourceList = id => ajax(BASE + '/ds/queryDatasource', id)

export const reqDatasourceDetail = id => ajax(BASE + '/ds/queryDetail', { id })

export const reqDeleteDatasources = ids => ajax(BASE + '/ds/delete', {ids})

export const reqAddDataChannel = params => ajax(BASE + '/dc/addDataChannel', params)

export const reqDataChannelList = id => ajax(BASE + '/dc/queryDataChanel', id)

export const reqDataChannelDetail = id => ajax(BASE + '/dc/detail', { id })

export const reqDeleteDataChannels = ids => ajax(BASE + '/dc/delete', {ids})