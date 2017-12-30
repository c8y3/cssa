export default function() {

    var values = new Set();

    var self = {};

    self.add = function(property) {
        values.add(property);
    };

    self.toArray = function() {
        return Array.from(values);
    };

    return self;
};
