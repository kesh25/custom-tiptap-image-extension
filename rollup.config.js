import sizes from '@atomico/rollup-plugin-sizes'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import autoExternal from 'rollup-plugin-auto-external'
import sourcemaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'

import * as pkg from './package.json' assert {type: "json"}

export default {
  external: [/@tiptap\/pm\/.*/],
  input: 'src/index.ts',
  output: [
    
    {
      name: "index",
      file: pkg.umd,
      format: 'umd',
      sourcemap: "inline",
      exports: 'named',
      globals: {
        '@tiptap/core': 'core', // Add this line
      },
    },
    {
      name: "index",
      file: pkg.main,
      format: 'cjs',
      sourcemap: "inline",
      exports: 'named',
    },
    {
      name: "index",
      file: pkg.module,
      format: 'es',
      sourcemap: "inline",
      exports: 'named',

    },
  ],
  plugins: [
    autoExternal({
      packagePath: './package.json',
    }),
    sourcemaps(),
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: './node_modules/**',
    }),
    sizes(),
    typescript({
      tsconfig: './tsconfig.json',
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          paths: {
            '@tiptap/*': ['packages/*/src'],
          },
        },
        include: null,
      },
    }),
  ],
}