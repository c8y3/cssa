import rootImport from 'rollup-plugin-root-import';
import path from 'path';

var external = [
    'fs',
    'css',
    'stargs'
];

var plugins = [
    rootImport({
        root: path.join(__dirname, '/src'),
// an equivalent way to do this could be:
//            useEntry: 'prepend',
        extensions: '.js'
    })
];

var banner = '#!/usr/bin/env node';
var format = 'cjs';

export default [{
    input: 'src/cssa.js',
    external: external,
    plugins: plugins,
    output: {
        file: 'bin/cssa',
        format: format,
        banner: banner
    }
}, {
    input: 'src/cssa-legacy.js',
    external: external.concat('es6-shim'),
    plugins: plugins,
    output: {
        file: 'bin/cssa-legacy',
        format: format,
        banner: banner
    }
}];
