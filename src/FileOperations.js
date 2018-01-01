import fs from 'fs';

export default function() {

    const self = {};

    self.read = function(path) {
        return fs.readFileSync(path, { encoding: 'utf8' });
    };

    return self;
};

