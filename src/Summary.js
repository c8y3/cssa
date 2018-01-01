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

    self.iterate = function(visit) {
        Object.keys(values).forEach(function(property) {
            visit(property, Array.from(values[property]));
        });
    };

    self.remove = function(allowedProperties) {
        allowedProperties.forEach(function(property) {
            delete(values[property]);
        });
    };

    return self;
};

