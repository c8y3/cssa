import ArgumentParser from '/ArgumentParser';
import FileAnalysis from '/FileAnalysis';
import ReportWriter from '/ReportWriter';

export default function() {
    const parser = ArgumentParser();

    const self = {};

    self.run = function(argv) {
        var options = parser.parse(argv);
        var analysis = FileAnalysis(options.whitelist);
        var writer = ReportWriter(options.output);

        var reports = analysis.processFiles(options.args);
        writer.write(reports);
    };

    return self;
};

