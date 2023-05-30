import { run } from './index';

const main = async () => {
  const output = await run(`
    mkdir temp
    ls -l
    rmdir temp
    echo "Hello world!"
  `);
  console.log('Final output:', output);
};
main();
