import JSONFormat from '/formats/JSONFormat';

describe('JSONFormat', function() {
    var subject;

    beforeEach(function() {
        subject = JSONFormat();
    });

    describe('format', function() {
        it('should output all the reports', function() {
            var result = subject.format([{path: 'path1', properties: []}, {path: 'path2', properties: []}]);
            assert.equal('[{"path":"path1","properties":[]},{"path":"path2","properties":[]}]', result);
        });
    });
});
