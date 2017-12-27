import TextFormat from '/formats/TextFormat';

describe('TextFormat', function() {
    var subject;

    beforeEach(function() {
        subject = TextFormat();
    });

    describe('format', function() {
        it('should not fail', function() {
            subject.format([{path: '', properties: []}]);
        });

        it('should output properties', function() {
            var output = subject.format([{path: '', properties: ['box-sizing']}]);
            assert.equal('Processed css file: \'\'\nFound property: \'box-sizing\'\n', output);
        });

        it('should output a title', function() {
            var output = subject.format([{path: 'path', properties: []}]);
            assert.equal('Processed css file: \'path\'\n', output);
        });

        it('should accept several reports', function() {
            subject.format([{path: 'path1', properties: []}, {path: 'path2', properties: []}]);
        });

        it('should insert a separator between each report', function() {
            var output = subject.format([{path: 'path1', properties: []}, {path: 'path2', properties: []}]);
            assert.equal('Processed css file: \'path1\'\nProcessed css file: \'path2\'\n', output);
        });
    });
});
