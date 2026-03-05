import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import cleanup from 'rollup-plugin-cleanup'
import filesize from 'rollup-plugin-filesize'

export default {
    input: './index.js',
    plugins: [commonjs(), nodeResolve(), cleanup()],
    output: [
        {
            file: 'dist/locust-fel.js',
            format: 'esm',
            plugins: [filesize()]
        }
    ]
}
