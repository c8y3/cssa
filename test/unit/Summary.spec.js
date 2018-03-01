import Summary from '/Summary';

describe('Summary', function() {
    let subject;

    beforeEach(function() {
        subject = Summary();
    });

    describe('iterate', function() {
        it('should iterate through all properties', function() {
            subject.add('box-sizing', 'border-box');
            const callback = sinon.spy();
            subject.iterate(callback);
            assert(callback.calledOnce);
            assert(callback.calledWith('box-sizing', ['border-box']));
        });
    });
});
