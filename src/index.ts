import { spawn } from 'child_process';
import { Blue, Green } from 'color-loggers';

const info = new Blue('[Start]:');
const success = new Green('[Done]:');

export const run = async (text: string) => {
  const commands = text
    .split('\n')
    .map((command) => command.trim())
    .filter((command) => command !== '');
  for (const command of commands) {
    info.log(command);
    await runOne(command);
    success.log(command);
  }
};

const runOne = (_command: string) => {
  const commands = _command.split(/\s+/);
  const command = commands[0];
  const args = commands.slice(1);
  const childProcess = spawn(command, args, { stdio: 'inherit', shell: true });
  return new Promise((resolve, reject) => {
    childProcess.once('exit', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });
  });
};
