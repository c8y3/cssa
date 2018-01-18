import Program from '/Program';

var program = Program();
try {
    program.run(process.argv);
} catch (e) {
    console.log(e.message);
}

