### DApp-SinglePage ###
This repository contains a Blockchain-based Web application. The objective of this repository contains necessary boilerplate code to implement any  Blockchain-based web application. This would speed-up  developers' application developers effort.

### Technologies ###

- Ethereum, ReactJS, Solidity, Web.js framework, Rinkby Test Network, Infura
- Atom IDE is recommended due to Syntax highlighting packages for Solidity.


### installation ###

- Clone this repository
- `npm install` to install necessary dependencies, listed in `package.json`
- `node compile.js` to compile the solidity contract

### React UI Installtion ###
- `npm install -g create-react-app` to install dependencies for boilerplate.
-  `create-react-app <project-name>` to generate ReactJS boilerplate code.


### Directory Structure ###

- `Contracts` directory contains contract files. The contract file is compiled into Online Remix editor first.
- `node_modules` directory contains various dependencies for, mentioned in `package.json` file.
- `compile.js` file compiles the smart contract
- `deploy.js` file deploys the smart contract on Rinkby Network.
-  `package.json` file list the dependencies of the project.
- `react` directory contains single page UI React code that interact with deployed contract.


### Traditional vs Ethereum Web application Architecture ###

<p align="center">
<a href=""target="_blank">
<img src="https://github.com/pankeshpatel/DApp-SinglePage/blob/master/resources/Traditional-Web-Architecture.PNG" alt="Traditional Web Application Architecture" width="600" height="280" border="10" />
</a>
</p>

<p align="center">
<a href=""target="_blank">
<img src="https://github.com/pankeshpatel/DApp-SinglePage/blob/master/resources/ethereum-architecture.PNG" alt="Ethereum-based Web Application Architecture" width="600" height="280" border="10" />
</a>
</p>

### ReactJS and Deployed Contract Interaction, Rendering ###

<p align="center">
<a href=""target="_blank">
<img src="https://github.com/pankeshpatel/DApp-SinglePage/blob/master/resources/ReactJS-Rendering-Concept.PNG" alt="Ethereum-based Web Application Architecture" width="450" height="280" border="10" />
</a>
</p>

### react/web3.js file ###

<p align="center">
<a href=""target="_blank">
<img src="https://github.com/pankeshpatel/DApp-SinglePage/blob/master/resources/Web3-OurApp-MetaMask.PNG" alt="Ethereum-based Web Application Architecture" width="450" height="280" border="10" />
</a>
</p>

### react/lottery.js file ###

<p align="center">
<a href=""target="_blank">
<img src="https://github.com/pankeshpatel/DApp-SinglePage/blob/master/resources/Contract-Interface-Bytecode.PNG" alt="Ethereum-based Web Application Architecture" width="450" height="280" border="10" />
</a>
</p>

<p align="center">
<a href=""target="_blank">
<img src="https://github.com/pankeshpatel/DApp-SinglePage/blob/master/resources/Contract-interface-ByteCode-Localcopy.PNG" alt="Ethereum-based Web Application Architecture" width="450" height="280" border="10" />
</a>
</p>

- Source of images:
  Ethereum and Solidity: The Complete Developer's Guide by Stephen Grider
