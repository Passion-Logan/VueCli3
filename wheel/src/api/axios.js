import axios from 'axios'
import store from '../store/index'

// 创建axios实例并配置拦截器
let service = axios.create({
  // headers: {'Content-Type': 'application/json'},
  timeout: 30000
})

// axios的header默认的Content-Type是'application/json;charset=UTF-8'
// 设置 post、put 默认 Content-Type为 fromdata
// formdata格式数据 "application/x-www-form-urlencoded;charset=UTF-8"
service.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'
service.defaults.headers.put['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // if (config.method === "post" || config.method === "put") {
    // post put  提交时，将对象转换为string，为处理java后台解析问题
    // config.data = JSON.stringify(config.data);
    // }
    // 请求发送前进行处理
    // return config;

    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = store.state.token
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    // 请求错误处理
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            path: '/',
            query: { redirect: router.currentRoute.fullPath }
          })
          break
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          this.$message({
            message: '登录过期，请重新登录',
            duration: 1000,
            type: 'warning',
            center: true
          })
          // 清除token
          localStorage.removeItem('token')
          store.commit('loginSuccess', null)
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }, 1000)
          break
        case 404:
          this.$message({
            message: '页面不存在!',
            duration: 1000,
            type: 'warning',
            center: true
          })
          break
        // 其他错误，直接抛出错误提示
        default:
      }
      return Promise.reject(error.response)
    }
    // let info = {},
    //   { status, statusText, data } = error.response

    // if (!error.response) {
    //   info = {
    //     code: 5000,
    //     msg: 'NetWork Error'
    //   }
    // } else {
    //   // 此处整理错误信息格式
    //   info = {
    //     code: status,
    //     data: data,
    //     msg: statusText
    //   }
    // }
  }
)

/**
 * 创建统一封装过的axios实例
 */
export default function() {
  return service
}
