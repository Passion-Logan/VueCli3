import api from '../index'
import urls from './urls'

export const testPost = p => api.post(urls.user, p)
