import PropertyValues from '/PropertyValues';

// TODO move the code related to property accumulation out of the tree traversal
export default function(ast) {

    var ignoredTypes = new Set(['media', 'keyframes', 'font-face']);

    var result = PropertyValues();

    function traverseDeclaration(declaration) {
        var type = declaration.type;
        if (type === 'comment') {
            return;
        }
        if (type !== 'declaration') {
            throw new Error('Unknown type \'' + type + '\' in ' + JSON.stringify(declaration));
        }
        result.add(declaration.property, declaration.value);
    }

    function traverseDeclarations(declarations) {
        declarations.forEach(traverseDeclaration);
    }

    function traverseRule(rule) {
        var type = rule.type;
        if (type === 'comment') {
            return;
        }
        if (type === 'charset') {
            return;
        }
        if (ignoredTypes.has(type)) {
            console.log('@' + type + ' not handled yet. Ignoring...');
            return;
        }
        if (type !== 'rule') {
            throw new Error('Unknown type \'' + type + '\' in ' + JSON.stringify(rule));
        }
        traverseDeclarations(rule.declarations);
    }

    function traverseRules(rules) {
        rules.forEach(traverseRule);
    }

    const self = {};

    self.traverse = function() {
        var rules = ast.stylesheet.rules;
        traverseRules(rules);
        return result.toArray();
    };

    return self;
};
