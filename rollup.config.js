import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss'
import autoExternal from 'rollup-plugin-auto-external';
import pkg from './package.json';
import visualizer from 'rollup-plugin-visualizer';
import del from 'rollup-plugin-delete';
import image from '@rollup/plugin-image'
import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

const svgr = require('@svgr/rollup').default

const config = [
    {
        input: pkg.source,
        output: [
            {
		file: pkg.main,
		format: 'umd',
		name: 'reactrss',
		globals: {
		    react: "React"
		}
	    }
        ],
        plugins: [
            resolve({
                mainFields: ['main'],
                extensions: ['.js', '.jsx']
            }),
            babel({
                babelHelpers: 'bundled',
                exclude: 'node_modules/**',
                presets: ['@babel/preset-react']
            }),
            svgr(),
            image(),
            postcss({
                extract: true,
                minimize: true
            }),
            terser(),
            typescript(
                {
                    tsconfig: './tsconfig.json',
                    exclude: './src/stories/**'
                }),
            autoExternal({
                builtins: false,
                dependencies: true,
                peerDependencies: true,
                packagePath: './package.json'
            }),
            visualizer({
                title: 'visualizer',
                template: 'treemap'
            }),
            del({targets: ['dist/*']})
        ],
        external: ['react', 'react-dom', 'react-scripts', 'prop-types']
    }
]

export default config;
