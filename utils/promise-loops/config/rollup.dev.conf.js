import merge from 'lodash/merge';
import rollupBaseConf from './rollup.base.conf';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const originPath = process.cwd();
const devConfig = {
  output: {
    file: `${originPath}/demo/index.js`,
    name: 'promiseLoop',
    format: 'umd',
    sourcemap: true,
  },
  plugins: [
    serve({
      open: true,
      contentBase: `${originPath}/demo`,
      host: 'localhost',
      port: 9999,
    }),
    livereload(),
  ]
};

const config = merge(rollupBaseConf, devConfig);

export default config;
