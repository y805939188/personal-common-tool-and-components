import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
// import sourcemaps from 'rollup-plugin-sourcemaps';
import postcss from 'rollup-plugin-postcss';
import { DEFAULT_EXTENSIONS } from '@babel/core';

const mode = process.env.NODE_ENV;
const isDev = mode === 'development';
const originPath = process.cwd();

export default {
  input: `${originPath}/src/index.ts`,
  output: {
    file: `${originPath}/lib/index.js`,
    name: 'react-vue-mirco-frame',
    format: 'esm',
    sourceMap: true,
  },
  watch: {
    include: [`${originPath}/demo/**`, `${originPath}/src/**`],
  },
  plugins: [
    typescript({ declaration: true }),
    babel({
      exclude: `${originPath}/node_modules/**`,
      extensions: [
        ...DEFAULT_EXTENSIONS,
        '.ts',
        '.tsx',
      ],
      runtimeHelpers: true,
    }),
    json(),
    commonjs(),
    // sourcemaps(),
    postcss({
      plugins: []
    }),
  ]
};
