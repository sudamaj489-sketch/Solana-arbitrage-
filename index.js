const { Connection } = require('@solana/web3.js');

const rpcUrl = process.env.RPC_URL || "https://api.mainnet-beta.solana.com";
const connection = new Connection(rpcUrl);

console.log("Solana Arbitrage Bot Started...");
console.log("Connected to RPC:", rpcUrl);

// Keep the process alive
setInterval(() => {
    console.log("Scanning markets for arbitrage opportunities...");
}, 10000);
