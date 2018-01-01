import fs from 'fs';
import Analysis from '/Analysis';

export default function(whitelistPath) {
    function readFile(path) {
        return fs.readFileSync(path, { encoding: 'utf8' });
    };

    function readWhitelist() {
        if (whitelistPath === undefined) {
            return [];
        }
        return JSON.parse(readFile(whitelistPath));
    }

    const whitelist = readWhitelist();

    const analysis = Analysis(whitelist);

    function processFile(path) {
        const input = readFile(path);
        return analysis.process(path, input);
    }

    const self = {};

    self.processFiles = function(paths) {
		return paths.map(processFile);
    };

    return self;
};

