import Program from '/Program';

describe('Program', function() {
    let subject;

    beforeEach(function() {
        subject = Program();
    });

    describe('run', function() {
        it('should not fail on empty file', function() {
            subject.run(['node', '_', 'test/data/empty.css']);
        });

        it('should not fail on file with one property', function() {
            subject.run(['node', '_', 'test/data/box-sizing.css']);
        });

        it('should not fail with a whitelist', function() {
            subject.run(['node', '_', 'test/data/box-sizing.css', '-w', 'test/data/box-sizing.json']);
        });
    });
});
