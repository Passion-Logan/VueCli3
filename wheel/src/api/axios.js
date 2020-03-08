import axios from 'axios'
// import router from '../router'
import store from '../store/index'

/**
 * 跳转登录页
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401
    // 未登录则跳转登录页面，并携带当前页面的路径
    // 在登录成功后返回当前页面，这一步需要在登录页操作。
    case 401:
      toLogin()
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
        toLogin()
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
      console.log(other)
  }
}

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
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = store.state.token
    token && (config.headers.Authorization = token)
    return config
  },
  error => Promise.reject(error)
)

// 添加响应拦截器
service.interceptors.response.use(
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  res => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
  // 请求失败
  error => {
    const { response } = error

    if (response) {
      // 请求发出，不在2xx范围
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      // 处理断网情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        store.commit('changeNetwork', false)
      } else {
        return Promise.reject(error)
      }
    }
  }
  // error => {
  //   if (error.response.status) {
  //     switch (error.response.status) {
  //       // 401
  //       // 未登录则跳转登录页面，并携带当前页面的路径
  //       // 在登录成功后返回当前页面，这一步需要在登录页操作。
  //       case 401:
  //         router.replace({
  //           path: '/',
  //           query: { redirect: router.currentRoute.fullPath }
  //         })
  //         break
  //       // 403 token过期
  //       // 登录过期对用户进行提示
  //       // 清除本地token和清空vuex中token对象
  //       // 跳转登录页面
  //       case 403:
  //         this.$message({
  //           message: '登录过期，请重新登录',
  //           duration: 1000,
  //           type: 'warning',
  //           center: true
  //         })
  //         // 清除token
  //         localStorage.removeItem('token')
  //         store.commit('loginSuccess', null)
  //         // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
  //         setTimeout(() => {
  //           router.replace({
  //             path: '/login',
  //             query: {
  //               redirect: router.currentRoute.fullPath
  //             }
  //           })
  //         }, 1000)
  //         break
  //       case 404:
  //         this.$message({
  //           message: '页面不存在!',
  //           duration: 1000,
  //           type: 'warning',
  //           center: true
  //         })
  //         break
  //       // 其他错误，直接抛出错误提示
  //       default:
  //     }
  //     return Promise.reject(error.response)
  //   }
  // }
)

/**
 * 创建统一封装过的axios实例
 */
export default function() {
  return service
}
