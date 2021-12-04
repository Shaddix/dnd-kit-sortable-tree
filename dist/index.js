
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dnd-kit-sortable-tree.cjs.production.min.js')
} else {
  module.exports = require('./dnd-kit-sortable-tree.cjs.development.js')
}
