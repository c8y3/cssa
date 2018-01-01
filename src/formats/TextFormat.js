export default function() {

    function format(report) {
        var lines = [];
        lines.push('Processed css file: \'' + report.path + '\'');
        report.summary.iterate(function(property, values) {
            lines.push('Found property: \'' + property + '\', with value: \'' + values[0] + '\'');            
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

