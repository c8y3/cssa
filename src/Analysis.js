import css from 'css';
import TreeTraversal from '/TreeTraversal';

export default function(whitelist) {

    function parse(input, path) {
        var ast = css.parse(input, { source: path });
        return TreeTraversal(ast);
    }

    var self = {};

    self.process = function(path, input) {
        var ast = parse(input, path);
        var summary = ast.traverse();
        
        summary.remove(whitelist);
        return {
            path: path,
            summary: summary
        };
    };

    return self;
};

