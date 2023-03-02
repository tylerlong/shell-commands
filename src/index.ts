import {spawn} from 'child_process';
import {Blue, Green, Red} from 'color-loggers';

const info = new Blue();
const success = new Green();
const error = new Red();

export const run = async (text: string) => {
  const commands = text
    .split('\n')
    .map(command => command.trim())
    .filter(command => command !== '');
  for (const command of commands) {
    info.log(command);
    try {
      await runOne(command);
      success.log(command);
    } catch (code) {
      error.log(`exit code is ${code}`);
      break;
    }
  }
};

const runOne = (command: string) => {
  const commands = command.split(/\s+/);
  command = commands[0];
  const args = commands.slice(1);
  const childProcess = spawn(command, args, {stdio: 'inherit', shell: true});
  return new Promise((resolve, reject) => {
    childProcess.once('exit', code => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });
  });
};
