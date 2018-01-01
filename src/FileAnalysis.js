import FileOperations from '/FileOperations';
import Analysis from '/Analysis';

export default function(whitelist) {
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

