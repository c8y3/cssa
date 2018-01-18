export default function() {

    function quote(message) {
        return '\'' + message + '\'';
    }

    function formatProperty(property, values) {
        let message = 'Found property: ' + quote(property) + ', with value'
        if (values.length !== 1) {
            message += 's';
        }
        values = values.map(quote);
        message += ': ' + values.join(', ');
        return message;
    }

    function format(report) {
        const lines = [];
        lines.push('Processed css file: ' + quote(report.path));
        report.summary.iterate(function(property, values) {
            lines.push(formatProperty(property, values));
        });
        return lines.join('\n');
    }

    const self = {};

    self.format = function(reports) {
        const reportOutputs = reports.map(function(report) {
            return format(report);
        });
        return reportOutputs.join('\n') + '\n';
    };

    return self;
};

