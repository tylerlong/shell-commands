import { spawn } from 'child_process';
import { Blue, Green } from 'color-loggers';

const info = new Blue('[Start]:');
const success = new Green('[Done]:');

export const run = async (text: string) => {
  const commands = text
    .split('\n')
    .map((command) => command.trim())
    .filter((command) => command !== '');
  let output = '';
  for (const command of commands) {
    info.log(command);
    output = await runOne(command);
    success.log(command);
  }
  return output;
};

const runOne = (_command: string): Promise<string> => {
  const commands = _command.split(/\s+/);
  const command = commands[0];
  const args = commands.slice(1);
  const childProcess = spawn(command, args, { stdio: ['inherit', 'pipe', 'inherit'], shell: true });
  return new Promise<string>((resolve, reject) => {
    const output: string[] = [];
    childProcess.stdout?.on('data', (data) => {
      const temp = data.toString();
      output.push(temp);
      process.stdout.write(temp);
    });
    childProcess.once('exit', (code) => {
      childProcess.stdout?.removeAllListeners();
      if (code === 0) {
        resolve(output.join(''));
      } else {
        reject(code);
      }
    });
  });
};
