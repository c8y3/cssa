import TextFormat from '/formats/TextFormat';
import Summary from '/Summary';

describe('TextFormat', function() {
    let subject;

    beforeEach(function() {
        subject = TextFormat();
    });

    describe('format', function() {
        it('should not fail', function() {
            const summary = Summary();
            subject.format([{path: '', summary: summary}]);
        });

        it('should output properties', function() {
            const summary = Summary();
            summary.add('box-sizing', 'border-box');
            const output = subject.format([{path: '', summary: summary}]);
            assert.equal('Processed css file: \'\'\nFound property: \'box-sizing\', with value: \'border-box\'\n', output);
        });

        it('should output all values associated to a property', function() {
            const summary = Summary();
            summary.add('position', 'absolute');
            summary.add('position', 'relative');
            const output = subject.format([{path: '', summary: summary}]);
            assert.equal('Processed css file: \'\'\nFound property: \'position\', with values: \'absolute\', \'relative\'\n', output);
        });

        it('should output a title', function() {
            const summary = Summary();
            var output = subject.format([{path: 'path', summary: summary}]);
            assert.equal('Processed css file: \'path\'\n', output);
        });

        it('should accept several reports', function() {
            const summary1 = Summary();
            const summary2 = Summary();
            subject.format([{path: 'path1', summary: summary1}, {path: 'path2', summary: summary2}]);
        });

        it('should insert a separator between each report', function() {
            const summary1 = Summary();
            const summary2 = Summary();
            var output = subject.format([{path: 'path1', summary: summary1}, {path: 'path2', summary: summary2}]);
            assert.equal('Processed css file: \'path1\'\nProcessed css file: \'path2\'\n', output);
        });
    });
});
