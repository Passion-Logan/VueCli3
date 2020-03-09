import axios from '../axios'
import baseUrl from '../baseUrl'

const test = {
  testGet() {
    console.log(baseUrl)
    return axios.get(baseUrl + '/test/hello');
  }
}

export default test;