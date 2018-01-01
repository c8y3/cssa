import JSONFormat from '/formats/JSONFormat';
import Summary from '/Summary';

describe('JSONFormat', function() {
    let subject;

    beforeEach(function() {
        subject = JSONFormat();
    });

    describe('format', function() {
        it('should output an report as JSON', function() {
            const summary = Summary();
            const result = subject.format([{path: 'path', summary: summary}]);
            assert.equal('{"path":"path","properties":[]}', result);
        });

        it('should output all the reports', function() {
            const summary1 = Summary();
            const summary2 = Summary();
            const result = subject.format([{path: 'path1', summary: summary1}, {path: 'path2', summary: summary2}]);
            assert.equal('[{"path":"path1","properties":[]},{"path":"path2","properties":[]}]', result);
        });
    });
});
