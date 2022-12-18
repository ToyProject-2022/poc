export default ({ $axios, store }, inject) => {
  const _axios = $axios.create()
  _axios.setHeader('Cache-Control', 'no-cache')
  _axios.setHeader('Pragma', 'no-cache')
  _axios.setHeader('Expires', '0')

  _axios.onRequest((config) => {
    if (process.client) {
      store._vm.$nuxt.$loading.start()
    }
    config.paramsSerializer = (paramObj) => {
      const params = new URLSearchParams()
      for (const key in paramObj) {
        if (typeof paramObj[key] === 'object') {
          if (paramObj[key] !== null && paramObj[key].length > 0) {
            paramObj[key].forEach((obj) => {
              params.append(key, obj)
            })
          }
        } else {
          params.append(key, paramObj[key])
        }
      }
      return params.toString()
    }
    return config
  })

  _axios.onResponse((response) => {
    if (process.client) {
      store._vm.$nuxt.$loading.finish()
    }

    return response
  })
  _axios.onError((error) => {
    if (process.client) {
      store._vm.$nuxt.$loading.start()
    }
    if (error && error.response) {
      if (error.response.status === 400) {
        return Promise.resolve(false)
      } else {
        return Promise.resolve(false)
      }
    } else {
      // 네트웍 에러, cors 에러 등
      return Promise.resolve(false)
    }
  })

  inject('_axios', _axios)
}
