import Stargs from 'stargs';

export default function() {
    var optionsDescription = {
        description: 'Checks constraints on css files',
        args: 'css_file_paths',
        options: {
            whitelist: {
                short: 'w',
                type: 'string',
                description: 'path to json configuration file'
            },
            output: {
                short: 'o',
                type: 'string',
                description: 'path to json output file'
            }
        }
    };

    var parser = Stargs(optionsDescription);

    var self = {};

    self.parse = function(argv) {
        return parser.parse(argv);
    };

    return self;
};
