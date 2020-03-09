let baseUrl = ''
console.log(process.env.NODE_ENV)
switch (process.env.NODE_ENV) {
  case 'dev':
    // 开发环境
    baseUrl = 'http://localhost:8081'
    break
  case 'test':
    // 测试环境
    baseUrl = 'http://www.xxx.com/test'
    break
  case 'prod':
    // 生产环境
    baseUrl = 'http://www.xxx.com.cn/pro'
    break
}

export default baseUrl;
