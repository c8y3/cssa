import Program from '/Program';

const program = Program();
try {
    program.run(process.argv);
} catch (error) {
    console.log(error.message);
}

