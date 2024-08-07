import { spawn } from 'child_process';
import { Blue, Green } from 'color-loggers';

const info = new Blue('[Start]:');
const success = new Green('[Done]:');

export const run = async (text: string) => {
  const commands = text
    .split('\n')
    .map((command) => command.trim())
    .filter((command) => command !== '')
    .filter((command) => !command.startsWith('#'));
  let output = '';
  for (const command of commands) {
    info.log(command);
    const temp = await runOne(command);
    if (temp !== '') {
      output = temp;
    }
    success.log(command);
  }
  return output;
};

const envSeparator = '<--env-->';
const runOne = (_command: string): Promise<string> => {
  const commands = `${_command} && echo '${envSeparator}' && env`.split(/\s+/);
  const command = commands[0];
  const args = commands.slice(1);
  const childProcess = spawn(command, args, { stdio: ['inherit', 'pipe', 'inherit'], shell: true });
  return new Promise<string>((resolve, reject) => {
    const output: string[] = [];
    const env: string[] = [];
    childProcess.stdout?.on('data', (data) => {
      const temp: string = data.toString();
      if (env.length === 0) {
        const tokens = temp.split(envSeparator);
        output.push(tokens[0]);
        process.stdout.write(tokens[0]);
        if (tokens.length > 1) {
          env.push(tokens[1]);
        }
      } else {
        env.push(temp);
      }
    });
    childProcess.once('exit', (code) => {
      childProcess.stdout?.removeAllListeners();
      if (code === 0) {
        env
          .join('')
          .split('\n')
          .forEach((line) => {
            const tokens = line.split('=');
            if (tokens.length > 1) {
              process.env[tokens[0]] = tokens[1];
            }
          });
        resolve(output.join(''));
      } else {
        reject(code);
      }
    });
  });
};
