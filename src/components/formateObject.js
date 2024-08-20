function snakeToCamel(s) {
  let t = false
  let r = ''
  // for (const i of s) {
  //   if (t) {
  //     r += i.toUpperCase()
  //     t = false
  //   } else if (i === '_') {
  //     t = true
  //   } else {
  //     r += i
  //   }
  // }
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
  const d = {}
  Object.keys(obj).forEach(i => {
    const f = snakeToCamel(i)
    d[f] = obj[i]
  })
  // for (const i in obj) {
  //   const f = snakeToCamel(i)
  //   d[f] = obj[i]
  // }
  return d
}
