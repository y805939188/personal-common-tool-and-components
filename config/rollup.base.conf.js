import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import sourcemaps from 'rollup-plugin-sourcemaps';

const originPath = process.cwd();
export default {
  input: `${originPath}/src/index.ts`,
  output: {
    file: `${originPath}/lib/index.js`,
    name: 'promiseLoop',
    format: 'umd',
    sourcemap: true,
  },
  watch: {
    include: [`${originPath}/demo/**`, `${originPath}/src/**`],
  },
  plugins: [
    typescript({ declaration: true }),
    babel({ exclude: `${originPath}/node_modules/**` }),
    json(),
    commonjs(),
    resolve(),
    sourcemaps(),
  ]
};
