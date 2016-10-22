# solcompiler-js

Use grunt and node.js to watch and compile contracts easily with simple commands.

## Install

`git clone https://github.com/AugustoL/solc-js-dev.git && cd solc-js-dev`

`npm install grunt -g`

`npm install`

## Args

The arguments --contractDir and --output can be used to define the contracts directory to use and the outputFile to create.

```
grunt compile --contractsDir='/test/' --output='/contractsTest.json'
```

## Config File

An optional config file can be added to define the outputFile path and the contracts directory to use:

```
{
    "output": "/home/augusto/solcompiler-js/contractsTest.json",
    "contractsDir": "/home/augusto/solcompiler-js/test/"
}
```

## Develop

Build: `npm start`
Watch and build: `npm run dev`

Desktop notifications for linux: Install the package "notify-send" to view desktop notification while you develop ;).
