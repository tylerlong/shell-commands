import {spawn} from 'child_process';

const logInfo = (message: string) => {
  console.log('\x1b[34m', '[Info]:', message, '\x1b[0m');
};

const logSuccess = (message: string) => {
  console.log('\x1b[32m', '[Done]:', message, '\x1b[0m');
};

const logError = (message: string) => {
  console.log('\x1b[31m', '[Error]:', message, '\x1b[0m');
};

export const run = async (text: string) => {
  const commands = text
    .split('\n')
    .map(command => command.trim())
    .filter(command => command !== '');
  for (const command of commands) {
    logInfo(command);
    try {
      await runOne(command);
      logSuccess(command);
    } catch (code) {
      logError(`exit code is ${code}`);
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
