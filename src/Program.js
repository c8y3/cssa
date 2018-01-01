import fs from 'fs';
import ArgumentParser from '/ArgumentParser';
import Analysis from '/Analysis';
import TextFormat from '/formats/TextFormat';
import JSONFormat from '/formats/JSONFormat';

const FileOperations = function() {

    const self = {};

    self.read = function(path) {
        return fs.readFileSync(path, { encoding: 'utf8' });
    };

    return self;
};

const FileAnalysis = function(whitelist) {
    const fileOperations = FileOperations();
    const analysis = Analysis();

    function processFile(path) {
        const input = fileOperations.read(path);

        return analysis.process(path, input, whitelist);
    }

    const self = {};

    self.processFiles = function(paths) {
		return paths.map(processFile);
    };

    return self;
};

export default function() {
    const fileOperations = FileOperations();
    const parser = ArgumentParser();

    function readWhitelist(path) {
        var result = [];
        if (path !== undefined) {
            result = JSON.parse(fileOperations.read(path));
        }
        return result;
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

        var analysis = FileAnalysis(whitelist);

        var reports = analysis.processFiles(options.args);
        var output = prettier.format(reports);
        outputStream.write(output);
    };

    return self;
};

