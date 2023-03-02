# shell-commands

A utility library to run shell commands.


## Install

```
yarn add shell-commands
```


## Use

```
import {run} from 'shell-commands';

await run(`
mkdir temp
rmdir temp
`);
```
