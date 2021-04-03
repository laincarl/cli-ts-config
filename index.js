const path = require('path');
const slash = require('slash2');

function getBabelConfig({
  typescript
}) {
  return {
    presets: [
      ...(typescript ? [require.resolve('@babel/preset-typescript')] : []),
      [require.resolve('@babel/preset-env')],
    ],
    plugins: [],
  };
}

function registerBabel() {
  const babelConfig = getBabelConfig({ typescript: true })
  const files = [
    'config.ts'
  ]
  const cwd = process.cwd()
  require("@babel/register")({
    ...babelConfig,
    extensions: ['.es6', '.es', '.jsx', '.js', '.mjs', '.ts', '.tsx'],
    only: files.map(file => slash(path.join(cwd, file))),
    babelrc: false,
    cache: false,
  });
}

registerBabel()
const config = require('./config.ts');

console.log(config.default)