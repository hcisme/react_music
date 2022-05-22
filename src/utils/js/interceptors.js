import Axios from 'axios'
import { store } from '../../redux/store'
import { SHOWCONTENT } from '../../redux/constant'
// nprogress进度条
import NProgress from 'nprogress'
// 引入nprogress样式文件
import 'nprogress/nprogress.css'
NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 700, // 递增进度条的速度
  showSpinner: true, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
})

// 请求拦截器(处理请求数据)
Axios.interceptors.request.use(
  (config) => {
    NProgress.start()
    store.dispatch({ type: SHOWCONTENT, bool: true })
    if (config.method === 'post') {
      config.data = {
        _t: new Date().getTime(),
        ...config.data,
      }
    } else if (config.method === 'get') {
      config.params = {
        _t: new Date().getTime(),
        ...config.params,
      }
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 响应拦截器(处理响应数据)
Axios.interceptors.response.use(
  (config) => {
    NProgress.done()
    store.dispatch({ type: SHOWCONTENT, bool: false })
    return config
  },
  function (error) {
    NProgress.done()
    store.dispatch({ type: SHOWCONTENT, bool: false })
    // Do something with response error
    return Promise.reject(error)
  }
)

export default Axios