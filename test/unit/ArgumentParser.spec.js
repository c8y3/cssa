import ArgumentParser from '/ArgumentParser';

describe('ArgumentParser', function() {
    let subject;
    const helpMessage = '\n'
                      + '  Usage: programName [options] <css_file_paths>\n'
                      + '\n'
                      + '  Checks constraints on css files\n'
                      + '\n'
                      + '\n'
                      + '  Options:\n'
                      + '\n'
                      + '    -w, --whitelist <whitelist>  path to json configuration file\n'
                      + '    -o, --output <output>        path to json output file\n'
                      + '    -h, --help                   output usage information\n';

    beforeEach(function() {
        subject = ArgumentParser();
    });

    describe('parser', function() {
        it('should extract the 3rd argument as the input file', function() {
            const options = subject.parse(['node', 'programName', 'inputFile']);
            assert.equal('inputFile', options.args);
        });

        it('should return an array with the input file', function() {
            const options = subject.parse(['node', 'programName', 'inputFile']);
            assert.isArray(options.args);
        });

        it('should return the configuration file with optional argument -w', function() {
            const options = subject.parse(['node', 'programName', '-w', 'whitelist.json', 'inputFile']);
            assert.equal('whitelist.json', options.whitelist);
        });

        it('should accept long option --whitelist', function() {
            const options = subject.parse(['node', 'programName', '--whitelist', 'whitelist.json', 'inputFile']);
            assert.equal('whitelist.json', options.whitelist);
        });

        it('should extract the input file correctly', function() {
            const options = subject.parse(['node', 'programName', '-w', 'whitelist.json', 'inputFile']);
            assert.equal('inputFile', options.args);
        });

        it('should throw an error with the help message when there are not enough arguments', function() {
            assert.throws(function() {
                subject.parse(['node', 'programName']);
            }, helpMessage);
        });

        it('should throw an error with the help message when there is option -h', function() {
            assert.throws(function() {
                subject.parse(['node', 'programName', '-h']);
            }, helpMessage);
        });

        it('should throw an error with the help message when there is option --help', function() {
            assert.throws(function() {
                subject.parse(['node', 'programName', '--help']);
            }, helpMessage);
        });

        it('should throw an error with the help message when there is option --help, even in the presence of a program name', function() {
            assert.throws(function() {
                subject.parse(['node', 'programName', '--help', 'inputFile']);
            }, helpMessage);
        });

        it('should accept option --output to specify ouput file', function() {
            const options = subject.parse(['_', '_', '--output', 'output.json', 'input.css']);
            assert.equal('output.json', options.output);
        });
    });
});
