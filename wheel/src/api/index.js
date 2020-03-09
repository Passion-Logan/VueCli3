import axios from './axios'

// 封装常用的方法 get post put delete
let instance = axios()

export default {
  get(url, params) {
    let options = {}

    if (params) {
      options.params = params
    }

    return new Promise((resolve, reject) => {
      instance
        .get(url, options)
        .then(res => resolve(res.data))
        .catch(err => reject(err.data))
    })
  },
  post(url, params) {
    let options = {}

    if (params) {
      options.params = params
    }

    return new Promise((resolve, reject) => {
      instance
        .post(url, options)
        .then(res => resolve(res.data))
        .catch(err => reject(err.data))
    })
  },
  put(url, params) {
    let options = {}

    if (params) {
      options.params = params
    }

    return new Promise((resolve, reject) => {
      instance
        .put(url, options)
        .then(res => resolve(res.data))
        .catch(err => reject(err.data))
    })
  },
  delete(url, params) {
    let options = {}

    if (params) {
      options.params = params
    }

    return new Promise((resolve, reject) => {
      instance
        .delete(url, options)
        .then(res => resolve(res.data))
        .catch(err => reject(err.data))
    })
  }
}
