# shell-commands

A utility library to run shell commands.


## Install

```
yarn add shell-commands
```


## Use

```ts
import {run} from './index';

run(`
  mkdir temp
  ls -l
  rmdir temp
`);
```
