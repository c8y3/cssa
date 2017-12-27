import fs from 'fs';
import ArgumentParser from '/ArgumentParser';
import Analysis from '/Analysis';
import TextFormat from '/formats/TextFormat';
import JSONFormat from '/formats/JSONFormat';

export default function() {

    var parser = ArgumentParser();
    var analysis = Analysis();

    function readFile(path) {
        return fs.readFileSync(path, { encoding: 'utf8' });
    }

    function readWhitelist(path) {
        var result = [];
        if (path !== undefined) {
            result = JSON.parse(readFile(path));
        }
        return result;
    }

    function analyseFile(whitelist, path) {
        var input = readFile(path);

        return analysis.process(path, input, whitelist);
    }

    function analyseFiles(whitelist, paths) {
		return paths.map(function(path) {
            return analyseFile(whitelist, path);
        });
    }

    function selectOutputStream(path) {
        if (path === undefined) {
            return process.stdout;
        }
        return fs.createWriteStream(path);
    }

    function selectFormat(path) {
        if (path === undefined) {
            return TextFormat();
        }
        return JSONFormat();
    }

    var self = {};

    self.run = function(argv) {
        var options = parser.parse(argv);
        var outputStream = selectOutputStream(options.output);
        var prettier = selectFormat(options.output);

        var whitelist = readWhitelist(options.whitelist);
        var reports = analyseFiles(whitelist, options.args);
        var output = prettier.format(reports);
        outputStream.write(output);
    };

    return self;
};

