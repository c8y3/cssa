import css from 'css';
import TreeTraversal from '/TreeTraversal';

export default function(whitelist) {
    function parse(input, path) {
        const ast = css.parse(input, { source: path });
        return TreeTraversal(ast);
    }

    const self = {};

    self.process = function(path, input) {
        const ast = parse(input, path);
        const summary = ast.traverse();

        summary.remove(whitelist);
        return {
            path: path,
            summary: summary
        };
    };

    return self;
};

