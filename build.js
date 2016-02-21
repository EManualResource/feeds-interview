'use strict'

const fs = require('fs')
const path = require('path')
const BASE = path.join(__dirname, 'feeds')

let files = fs.readdirSync(BASE)
let all = []

files.forEach(function (file, index) {
  if (file.indexOf('.') == 0) {
    return
  }
  if (fs.lstatSync(path.join(BASE, file)).isDirectory()) {
    all.push(
      require(path.join(BASE, file, 'info.json'))
    )
  }
})

fs.writeFileSync(path.join(BASE, 'all.json'), JSON.stringify(all, null, 4), {encoding: 'utf-8'})
fs.writeFileSync(path.join(BASE, 'all.min.json'), JSON.stringify(all, null, 0), {encoding: 'utf-8'})

console.log('build finish')
