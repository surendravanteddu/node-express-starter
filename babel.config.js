const {NODE_ENV} = process.env

const presets = [
  ['@babel/env', {"targets": {"node": "current"}}]
]

const plugins = [
  '@babel/plugin-proposal-class-properties'
]

const ignore = []

if (NODE_ENV === 'production') {
  ignore.push('**/*.test.js')
}

module.exports = {
  presets,
  plugins,
  ignore
}
