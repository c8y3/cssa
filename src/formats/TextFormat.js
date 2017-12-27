export default function() {

    function format(report) {
        var lines = [];
        lines.push('Processed css file: \'' + report.path + '\'');
        report.properties.forEach(function(property) {
            lines.push('Found property: \'' + property + '\'');
        });
        return lines.join('\n');
    }

    var self = {};

    self.format = function(reports) {
        var reportOutputs = reports.map(function(report) {
            return format(report);
        });
        return reportOutputs.join('\n') + '\n';
    };

    return self;
};

