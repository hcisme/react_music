import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { LoadingOutlined } from '@ant-design/icons'
import axiosinit from './utils/js/interceptors.js'
import './index.css'
import * as api from './utils/js/api.js'

React.$apis = api
React.$axios = axiosinit

ReactDOM.render(
  <BrowserRouter>
    <Suspense
      fallback={
        <>
          loading.....
          <LoadingOutlined />
        </>
      }
    >
      <App />
    </Suspense>
  </BrowserRouter>,
  document.getElementById('root')
)
