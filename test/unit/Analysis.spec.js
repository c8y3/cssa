import Analysis from '/Analysis';

describe('Analysis', function() {
    var subject;

    beforeEach(function() {
        subject = Analysis([]);
    });

    describe('process', function() {
        it('should not fail', function() {
            subject.process('', '');
        });

        it('should return an empty set', function() {
            var report = subject.process('', '');
            assert.equal(0, report.properties.length);
        });

        it('should return a set with properties', function() {
            var report = subject.process('', '* { box-sizing: border-box; }');
            assert.equal('box-sizing', report.properties[0]);
        });

        it('should not fail on comment', function() {
            subject.process('', '/* a comment */');
        });

        it('should not fail on @charset', function() {
            subject.process('', '@charset "UTF-8";');
        });

        it('should ignore @media', function() {
            subject.process('', '@media print {}');
        });

        it('should not flag a property which is in the white list', function() {
            subject = Analysis(['box-sizing']);
            var report = subject.process('', '* { box-sizing: border-box; }');
            assert.equal(0, report.properties.length);
        });

        it('should throw exception with file name on parse error', function() {
            try {
                subject.process('path', '}');
            } catch (e) {
                assert.include(e.message, 'path');
            }
        });

        it('should not fail on @keyframes', function() {
            subject.process('', '@keyframes slidein { }');
        });

        it('should not fail on @font-face', function() {
            subject.process('', '@font-face {}');
        });

        it('should not report a property undefined on an inner comment', function() {
            var report = subject.process('', 'p { /* */ }');
            assert.equal(0, report.properties.length);
        });
    });
});
