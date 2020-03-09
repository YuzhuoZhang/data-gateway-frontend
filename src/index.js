import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import App from './app'
/**
 * 入口js文件
 * 渲染index.html的root div
 * 用路由包起来，实现整个app的路由功能
 */
ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
),document.getElementById('root'))