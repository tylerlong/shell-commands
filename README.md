# shell-commands

A utility library to run shell commands.

## Install

```
yarn add shell-commands
```

## Use

```ts
import { run } from 'shell-commands';

run(`
  mkdir temp
  ls -l
  rmdir temp
`);
```

## Sample output

```
 [Info]: mkdir temp
 [Done]: mkdir temp
 [Info]: ls -l
total 168
-rw-r--r--    1 tyler.liu  staff    199 Mar  2 10:00 README.md
drwxr-xr-x    3 tyler.liu  staff     96 Mar  2 10:38 lib
drwxr-xr-x  210 tyler.liu  staff   6720 Mar  2 10:40 node_modules
-rw-r--r--    1 tyler.liu  staff    377 Mar  2 10:40 package.json
drwxr-xr-x    4 tyler.liu  staff    128 Mar  2 10:39 src
drwxr-xr-x    2 tyler.liu  staff     64 Mar  2 10:41 temp
-rw-r--r--    1 tyler.liu  staff  76179 Mar  2 09:31 yarn.lock
 [Done]: ls -l
 [Info]: rmdir temp
 [Done]: rmdir temp
```

## Capture the last command output

```ts
import { run } from 'shell-commands';

const main = async () => {
  const lastOutput = await run(`
    mkdir temp
    ls -l
    rmdir temp
  `);
  console.log(lastOutput);
}
main();
```

In the example above, we captured the output of the command `ls  -l` since the last command `rmdir temp` outputs nothing.


## Special case

I use yarn to run the following script

```ts
run('npm publish')
```

Always got the following error

```
This command requires you to be logged in to https://registry.yarnpkg.com
```

The solution is 

```ts
yarn config set registry https://registry.npmjs.org
```

## Environment Variables

You may set environment variables in the command string.

```ts
import { run } from 'shell-commands';

await run(`
  export HELLO='world'
  echo $HELLO
`);
await run(`echo $HELLO`);
```

Please note that the environment variables are only available in the same Node.js process.
It will not change your current shell environment. It will not change your Operating System environment.


## Limitations

- The library does not support alias commands. For example, `python` is an alias of `python3`. You need to use `python3` instead of `python`.
