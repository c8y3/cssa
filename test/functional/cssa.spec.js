import path from 'path';
import fs from 'fs-extra';
import childProcess from 'child_process';

const TEST_DIR = 'test_output';

describe('cssa', function() {
    beforeEach(function() {
        fs.ensureDirSync(TEST_DIR);
    });

    afterEach(function() {
        fs.removeSync(TEST_DIR);
    });

    function cssa(args) {
        const output = childProcess.execFileSync('./bin/cssa', args);
        return output.toString();
    }

    it('should not fail without any argument', function() {
        cssa([]);
    });

    it('should not output allowed properties', function() {
        const output = cssa(['test/data/box-sizing.css', '-w', 'test/data/box-sizing.json']);
        assert.equal('Processed css file: \'test/data/box-sizing.css\'\n', output);
    });

    it('should accept @keyframes', function() {
        const stdout = cssa(['test/data/keyframes.css']);
        assert.equal('@keyframes not handled yet. Ignoring...\nProcessed css file: \'test/data/keyframes.css\'\n', stdout);
    });

    it('should accept @font-face', function() {
        const stdout = cssa(['test/data/font-face.css']);
        assert.equal('@font-face not handled yet. Ignoring...\nProcessed css file: \'test/data/font-face.css\'\n', stdout);
    });

    it('should accept several files', function() {
        const stdout = cssa(['test/data/empty.css', 'test/data/box-sizing.css']);
        assert.include(stdout, 'test/data/box-sizing.css');
    });

    it('should write output into file when json output file is specified', function() {
        const outputFile = path.join(TEST_DIR, 'output.json');
        cssa(['test/data/empty.css', '--output', outputFile]);
        const output = fs.readFileSync(outputFile, {encoding: 'utf8'});
        assert.deepEqual({path: 'test/data/empty.css', properties: []}, JSON.parse(output));
    });

    it('should not report a property undefined on inner comment', function() {
        const output = cssa(['test/data/comment.css']);
        assert.equal('Processed css file: \'test/data/comment.css\'\n', output);
    });
});

