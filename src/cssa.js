import Program from '/Program';

const program = Program();
try {
    program.run(process.argv);
} catch (e) {
    console.log(e.message);
}

