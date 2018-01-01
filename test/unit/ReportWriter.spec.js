import fs from 'fs';
import ReportWriter from '/ReportWriter';

describe('ReportWriter', function() {

    it('should not fail when the output is a json file', function() {
        var path = 'output.json';
        ReportWriter(path);
        fs.unlinkSync(path);
    });
});
