function snakeToCamel(s) {
  let t = false
  let r = ''
  s.split('').forEach(i => {
    if (t) {
      r += i.toUpperCase()
      t = false
    } else if (i === '_') {
      t = true
    } else {
      r += i
    }
  })
  return r
}

export default function formateObject(obj) {
  if (obj === '' || obj === undefined) {
    console.log('null obj in passed to formateObject function', obj)
    return {}
  }
  const d = {}
  Object.keys(obj).forEach(i => {
    const f = snakeToCamel(i)
    d[f] = obj[i]
  })
  return d
}
