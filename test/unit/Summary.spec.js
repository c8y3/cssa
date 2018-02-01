import Summary from '/Summary';

describe('Summary', function() {
    let subject;

    beforeEach(function() {
        subject = Summary();
    });

    describe('iterate', function() {
        it('should iterate through all properties', function() {
            subject.add('box-sizing', 'border-box');
            let callCount = 0;
            let argument1;
            let argument2;
            // TODO use sinon here
            subject.iterate(function(property, values) {
                callCount++;
                argument1 = property;
                argument2 = values;
            });
            assert.equal(1, callCount);
            assert.equal('box-sizing', argument1);
            assert.deepEqual(['border-box'], argument2);
        });
    });
});
