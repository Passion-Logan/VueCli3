let baseUrl = ''
console.log(process.env.NODE_ENV)
switch (process.env.NODE_ENV) {
  case 'development':
    // 开发环境
    baseUrl = 'http://localhost:8081'
    break
  case 'test':
    // 测试环境
    baseUrl = 'http://localhost:8082'
    break
  case 'production':
    // 生产环境
    baseUrl = 'http://localhost:8083'
    break
}

export default baseUrl
