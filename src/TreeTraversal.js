import Summary from '/Summary';

export default function(ast) {
    const ignoredTypes = new Set(['media', 'keyframes', 'font-face']);

    const result = Summary();

    function traverseDeclaration(declaration) {
        const type = declaration.type;
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
        const type = rule.type;
        if (type === 'comment' || type === 'charset') {
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
        const rules = ast.stylesheet.rules;
        traverseRules(rules);
        return result;
    };

    return self;
};
