import css from 'css';

export default function() {

    function analyseRules(rules) {
        var result = new Set();
        rules.forEach(function(rule) {
            var type = rule.type;
            if (type === 'comment') {
                return;
            }
            if (type === 'charset') {
                return;
            }
            if (type === 'media') {
                console.log('@media not handled yet. Ignoring...');
                return;
            }
            if (type === 'keyframes') {
                console.log('@keyframes not handled yet. Ignoring...');
                return;
            }
            if (type !== 'rule') {
                throw new Error('Unknown type \'' + type + '\' in ' + JSON.stringify(rule));
            }
            var declarations = rule.declarations;
            declarations.forEach(function(declaration) {
                var type = declaration.type;
                if (type === 'comment') {
                    return;
                }
                if (type !== 'declaration') {
                    throw new Error('Unknown type \'' + type + '\' in ' + JSON.stringify(declaration));
                }
                result.add(declaration.property);
            });
        });
        return Array.from(result);
    }

    function removeAllowedProperties(properties, whitelist) {
        var allowedProperties = new Set(whitelist);
        var result = properties.filter(function(property) {
            return !allowedProperties.has(property);
        });
        return result;
    }

    var self = {};

    self.process = function(path, input, whitelist) {
        var ast = css.parse(input, { source: path });
        var rules = ast.stylesheet.rules;
        var properties = analyseRules(rules);
        var forbiddenProperties = removeAllowedProperties(properties, whitelist);
        return {
            path: path,
            properties: forbiddenProperties
        };
    };

    return self;
};

