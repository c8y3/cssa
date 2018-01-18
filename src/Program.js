import ArgumentParser from '/ArgumentParser';
import FileAnalysis from '/FileAnalysis';
import ReportWriter from '/ReportWriter';

export default function() {
    const parser = ArgumentParser();

    const self = {};

    self.run = function(argv) {
        const options = parser.parse(argv);
        const analysis = FileAnalysis(options.whitelist);
        const writer = ReportWriter(options.output);

        const reports = analysis.processFiles(options.args);
        writer.write(reports);
    };

    return self;
};

