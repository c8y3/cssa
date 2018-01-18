import fs from 'fs';
import TextFormat from '/formats/TextFormat';
import JSONFormat from '/formats/JSONFormat';

export default function(path) {
    function selectOutputStream() {
        if (path === undefined) {
            return process.stdout;
        }
        return fs.createWriteStream(path);
    }

    function selectFormat() {
        if (path === undefined) {
            return TextFormat();
        }
        return JSONFormat();
    }

    const outputStream = selectOutputStream();
    const prettier = selectFormat();

    const self = {};

    self.write = function(reports) {
        const output = prettier.format(reports);
        outputStream.write(output);
    };

    return self;
};
