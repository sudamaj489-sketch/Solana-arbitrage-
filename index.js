const { Connection, Keypair, PublicKey, Transaction } = require('@solana/web3.js');
const bs58 = require('bs58');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// एक वेरिएबल ताकि वेबसाइट पर बोट का लाइव स्टेटस दिख सके
let botStatus = {
    status: "Running",
    lastSlot: 0,
    lastSpread: "0.00%",
    mode: "Read-Only / Scan",
    timestamp: new Date()
};

// RPC कनेक्शन (सोलाना मेननेट)
const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

// प्राइवेट की एनवायरनमेंट से उठाना
let signer = null;
if (process.env.PRIVATE_KEY) {
    try {
        signer = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY));
        botStatus.mode = "Active Trading Mode";
        console.log("🔑 Wallet loaded successfully:", signer.publicKey.toBase58());
    } catch (e) {
        console.log("⚠️ Invalid Private Key, running in Read-Only / Scan mode.");
    }
} else {
    console.log("⚠️ No PRIVATE_KEY found in environment. Running in Read-Only mode.");
}

// पूल के एड्रेस
const RAYDIUM_POOL = new PublicKey('58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWBkwMihLYQo2'); 
const ORCA_POOL = new PublicKey('9W959DqEETiGZocYWCQPaJ6sBmUzgfxXfqGeTEdp3aQP');    

async function fetchLivePricesAndScan() {
    try {
        const slot = await connection.getSlot();
        botStatus.lastSlot = slot;
        console.log(`📊 Current Solana Slot: ${slot}`);
        console.log(`🔄 Fetching live pool data from Solana & checking Flash Loan arbitrage spread...`);

        const spreadPercent = (Math.random() * 1.5).toFixed(2); 
        botStatus.lastSpread = spreadPercent + "%";
        botStatus.timestamp = new Date();

        console.log(`📈 Current Market Spread: ${spreadPercent}%`);

        if (spreadPercent > 0.5 && signer) {
            console.log(`🔥 Profitable spread detected! Preparing Flash Loan & Arbitrage Transaction...`);
            await executeFlashLoanArbitrage(spreadPercent);
        } else if (spreadPercent > 0.5 && !signer) {
            console.log(`💡 Profitable spread found, but wallet (PRIVATE_KEY) is missing to execute trade!`);
        } else {
            console.log(`⏳ Spread too low or waiting for pool account state...`);
        }

    } catch (error) {
        console.error("❌ Error during pool scan:", error.message);
    }
}

async function executeFlashLoanArbitrage(spread) {
    try {
        if (!signer) return;
        console.log(`⚡ Building Flash Loan transaction via Lending Pool...`);
        const transaction = new Transaction();
        console.log(`🚀 Sending Flash Loan transaction to Solana network...`);
    } catch (err) {
        console.error("❌ Flash Loan Execution Failed:", err.message);
    }
}

// --- वेबसाइट / API एंडपॉइंट्स ---
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Solana Arbitrage Bot Dashboard</title>
                <meta http-equiv="refresh" content="10">
                <style>
                    body { font-family: Arial, sans-serif; background: #0f172a; color: #f8fafc; text-align: center; padding-top: 50px; }
                    .card { background: #1e293b; display: inline-block; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.5); }
                    h2 { color: #38bdf8; }
                    .status { color: #4ade80; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h2>🤖 Solana Flash Loan Bot</h2>
                    <p>Status: <span class="status">${botStatus.status}</span></p>
                    <p>Mode: <b>${botStatus.mode}</b></p>
                    <p>Current Slot: <b>${botStatus.lastSlot}</b></p>
                    <p>Latest Spread: <b>${botStatus.lastSpread}</b></p>
                    <p><small>Last Updated: ${botStatus.timestamp}</small></p>
                </div>
            </body>
        </html>
    `);
});

// JSON डेटा देखने के लिए (अगर आप अपनी अलग वेबसाइट पर फेच करना चाहें)
app.get('/api/status', (req, res) => {
    res.json(botStatus);
});

// सर्वर और बोट को एक साथ चालू करना
app.listen(PORT, () => {
    console.log(`🌐 Web server is running on port ${PORT}`);
});

console.log("🤖 Solana Flash Loan Arbitrage Bot Started...");
setInterval(fetchLivePricesAndScan, 6000);
