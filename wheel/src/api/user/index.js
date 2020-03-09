import axios from '../axios'
import baseUrl from '../baseUrl'

const user = {
  testGet() {
    return axios.get(baseUrl + '/test/hello');
  }
}

export default user;