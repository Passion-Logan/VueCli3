let BASE_URL = ''
switch (process.env.NODE_ENV) {
  case 'dev':
    // 开发环境
    BASE_URL = 'http://localhost:8081'
    break
  case 'test':
    // 测试环境
    BASE_URL = 'http://www.xxx.com/test'
    break
  case 'prod':
    // 生产环境
    BASE_URL = 'http://www.xxx.com.cn/pro'
    break
}

export default BASE_URL
