import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { LoadingOutlined, AliwangwangOutlined } from '@ant-design/icons'
import axiosinit from './utils/js/interceptors.js'
import * as api from './utils/js/api.js'
import './index.css'

React.$apis = api
React.$axios = axiosinit

ReactDOM.render(<BrowserRouter>
  <Suspense
    fallback={
      <div style={{ width: '100%', color: '#1890ff', textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 25, fontWeight: 200 }}>
        Loading.....
        <AliwangwangOutlined />
        (长时间加载不出来,请尝试切换网络)
        <LoadingOutlined />
      </div>
    }
  >
    <App />
  </Suspense>
</BrowserRouter>, document.getElementById('root'))
