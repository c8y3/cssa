import Stargs from 'stargs';

export default function() {
    const optionsDescription = {
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

    const parser = Stargs(optionsDescription);

    const self = {};

    self.parse = function(argv) {
        return parser.parse(argv);
    };

    return self;
};
