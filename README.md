# solc-js-dev
Use grunt and node.js to watch and compile contracts easily with simple commands.

## Install

`git clone https://github.com/AugustoL/solc-js-dev.git && cd solc-js-dev`
`npm install`

## Develop

First of all change the name of the contracts in the order you want them to be added in the all.sol file, the list of the contracts its on the Gruntfile.js.

Once you have the contracts defined on the roder you want on Gruntfile.js you can build or watch for changes and watch automatically:

Build: `npm run build`
Watch and build: `npm run dev`

Desktop notifications for linux: Install the package "notify-send" to view desktop notification while you develop ;).
