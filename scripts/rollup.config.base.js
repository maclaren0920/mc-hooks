import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'; 
import alias from '@rollup/plugin-alias'; 
import replace from '@rollup/plugin-replace';
import { eslint } from 'rollup-plugin-eslint';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import clear from 'rollup-plugin-clear';
import json from '@rollup/plugin-json';
import typescript from "@rollup/plugin-typescript";
import { uglify } from "rollup-plugin-uglify";
import { name, version, author } from '../package.json';


const pkgName = '@mc-hooks';

const banner =
'/*!\n' +
` * ${name} v${version}\n` +
` * (c) 2014-${new Date().getFullYear()} ${author}\n` +
' * Released under the MIT License.\n' +
' */'

export default {
  input: 'src/hooks/index.ts',
  output: [
    {
      file: `dist/${pkgName}.umd.js`,
      format: 'umd',
      name: pkgName,
      banner
    },
    {
      file: `dist/${pkgName}.umd.min.js`,
      format: 'umd',
      name: pkgName,
      banner,
      plugins: [terser()]
    },
    {
      file: `dist/${pkgName}.cjs.js`,
      format: 'cjs',
      name: pkgName,
      banner
    },
    {
      file: `dist/${pkgName}.esm.js`,
      format: 'es',
      banner
    }
  ],
  plugins: [
    eslint({
      throwOnError: true,
      include: ['src/**'],
      exclude: ['node_modules/**']
    }),
    typescript(),
    json(),
    clear({
      targets: ['dist']
    }),
    alias(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      preventAssignment: true
    }),
    nodeResolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    }),
    uglify()
  ]
};