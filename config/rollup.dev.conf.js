import merge from 'lodash/merge';
import rollupBaseConf from './rollup.base.conf';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const devConfig = {
  plugins: [
    serve({
      open: false,
      contentBase: `${process.cwd()}/demo`,
      host: 'localhost',
      port: 9999,
    }),
    livereload(),
  ]
};

const config = merge(rollupBaseConf, devConfig);

export default config;
