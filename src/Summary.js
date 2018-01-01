export default function() {

    var values = {};

    var self = {};

    self.add = function(property, value) {
        var previous = values[property];
        if (previous === undefined) {
            previous = new Set();
            values[property] = previous;
        }
        previous.add(value);
    };

    self.toArray = function() {
        return Object.keys(values);
    };

    return self;
};
