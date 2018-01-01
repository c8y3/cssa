export default function() {

    const self = {};

    self.format = function(reports) {
        reports = reports.map(function(report) {
            return {
                path: report.path,
                properties: report.summary.toArray()
            };
        });
        if (reports.length === 1) {
            reports = reports[0];
        }
        return JSON.stringify(reports);
    };

    return self;
};

