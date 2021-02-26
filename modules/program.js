import { Command } from 'commander';
const program = new Command();

program
    .version('0.0.1')
    .option('-t, --type <type>', 'Type files', 'js')
    .option('--no-wipe', 'Disable wipe dir before starting', false)
    .parse(process.argv);

export default program;
