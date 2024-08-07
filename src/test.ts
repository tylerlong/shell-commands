import { run } from './index';

const main = async () => {
  let output = await run(`
    mkdir temp
    ls -l
    rmdir temp
    echo "hello" && echo "world" && echo "again"
    # this is a comment
    mkdir temp
    rmdir temp
    export HELLO='world'
    echo $HELLO
  `);
  output = await run(`
    echo $HELLO
  `);
  console.log('Last output:', output);
};
main();
