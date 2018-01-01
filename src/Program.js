import FileOperations from '/FileOperations';
import ArgumentParser from '/ArgumentParser';
import FileAnalysis from '/FileAnalysis';
import ReportWriter from '/ReportWriter';

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

    const self = {};

    self.run = function(argv) {
        var options = parser.parse(argv);
        var writer = ReportWriter(options.output);

        var whitelist = readWhitelist(options.whitelist);
        var analysis = FileAnalysis(whitelist);

        var reports = analysis.processFiles(options.args);
        writer.write(reports);
    };

    return self;
};

