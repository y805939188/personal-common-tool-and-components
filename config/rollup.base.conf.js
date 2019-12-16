import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import sourcemaps from 'rollup-plugin-sourcemaps';

const mode = process.env.NODE_ENV;
const isDev = mode === 'development';

export default {
  input: isDev ? process.cwd() + '/demo/index.ts' : process.cwd() + '/src/index.ts',
  output: {
    file: isDev ? process.cwd() + '/demo/index.js' : process.cwd() + '/lib/index.js',
    name: 'promiseLoop',
    format: 'umd',
    sourcemap: true,
  },
  watch: {
    include: [process.cwd() + '/demo/**', process.cwd() + '/src/**'],
  },
  plugins: [
    typescript({
      declaration: true,
    }),
    babel({ exclude: process.cwd() + '/node_modules/**' }),
    json(),
    commonjs(),
    resolve(),
    sourcemaps(),
  ]
};
