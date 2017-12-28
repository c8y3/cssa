// TODO move the code related to property accumulation out of the tree traversal
export default function(ast) {

    var result = new Set();

    function traverseDeclaration(declaration) {
        var type = declaration.type;
        if (type === 'comment') {
            return;
        }
        if (type !== 'declaration') {
            throw new Error('Unknown type \'' + type + '\' in ' + JSON.stringify(declaration));
        }
        result.add(declaration.property);
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
        if (type === 'media') {
            console.log('@media not handled yet. Ignoring...');
            return;
        }
        if (type === 'keyframes') {
            console.log('@keyframes not handled yet. Ignoring...');
            return;
        }
        if (type === 'font-face') {
            console.log('@font-face not handled yet. Ignoring...');
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
        return Array.from(result);
    };

    return self;
};
