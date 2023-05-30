import { run } from './index';

const main = async () => {
  const output = await run(`
    mkdir temp
    ls -l
    rmdir temp
    echo "hello" && echo "world" && echo "again"
  `);
  console.log('Final output:', output);
};
main();
