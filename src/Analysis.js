import css from 'css';
import TreeTraversal from '/TreeTraversal';

export default function(whitelist) {

    function parse(input, path) {
        var ast = css.parse(input, { source: path });
        return TreeTraversal(ast);
    }

    function removeAllowedProperties(properties) {
        var allowedProperties = new Set(whitelist);
        var result = properties.filter(function(property) {
            return !allowedProperties.has(property);
        });
        return result;
    }

    var self = {};

    self.process = function(path, input) {
        var ast = parse(input, path);
        var properties = ast.traverse();
        var forbiddenProperties = removeAllowedProperties(properties);
        return {
            path: path,
            properties: forbiddenProperties
        };
    };

    return self;
};

