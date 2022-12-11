const deepCopy = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  if (obj instanceof Array) {
    return obj.reduce((arr, item, i) => {
      arr[i] = deepCopy(item)
      return arr
    }, [])
  }

  if (obj instanceof Object) {
    return Object.keys(obj).reduce((newObj, key) => {
      newObj[key] = deepCopy(obj[key])
      return newObj
    }, {})
  }
}

export default (context, inject) => {
  inject('_copy', deepCopy)
}
