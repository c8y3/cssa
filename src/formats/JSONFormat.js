export default function() {

    const self = {};

    self.format = function(report) {
        if (report.length === 1) {
            report = report[0];
        }
        return JSON.stringify(report);
    };

    return self;
};

