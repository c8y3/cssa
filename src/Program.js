import FileOperations from '/FileOperations';
import ArgumentParser from '/ArgumentParser';
import FileAnalysis from '/FileAnalysis';
import TextFormat from '/formats/TextFormat';
import JSONFormat from '/formats/JSONFormat';

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

    const self = {};

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

