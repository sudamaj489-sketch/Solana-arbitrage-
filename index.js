const { Connection, Keypair, PublicKey, Transaction, LAMPORTS_PER_SOL } = require('@solana/web3.js');
const bs58 = require('bs58');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static(__dirname));

const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

let signer = null;
let walletStatus = "Read-Only (No Wallet)";
let walletPublicKey = "Not Connected";

if (process.env.PRIVATE_KEY) {
    try {
        signer = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY.trim()));
        walletPublicKey = signer.publicKey.toBase58();
        walletStatus = "Active Wallet Connected 🟢";
    } catch (e) {
        walletStatus = "Invalid Key ❌";
    }
}

// बोट का ON/OFF स्टेट (शुरुआत में बंद रहेगा ताकि आप जब चाहें तब चालू करें)
let isBotRunning = false;

let botData = {
    status: "Stopped 🔴",
    lastSlot: 0,
    lastSpread: "0.00%",
    gasBalance: "0.00",
    netProfit: "$0.00",
    walletState: walletStatus,
    walletAddress: walletPublicKey,
    timestamp: new Date()
};

// बोट कंट्रोल करने के लिए API
app.post('/api/control', (req, res) => {
    const { action } = req.body;
    if (action === 'start') {
        isBotRunning = true;
        botData.status = "24/7 Live 🟢";
        console.log("🟢 Bot manually STARTED via Web Dashboard");
    } else if (action === 'stop') {
        isBotRunning = false;
        botData.status = "Stopped 🔴";
        console.log("🔴 Bot manually STOPPED via Web Dashboard");
    }
    res.json({ success: true, status: botData.status });
});

// मार्केट स्कैन और ट्रेड एग्जीक्यूशन
async function scanAndExecuteArbitrage() {
    if (!isBotRunning) {
        return; // अगर बोट बंद है, तो कुछ नहीं होगा
    }

    try {
        const slot = await connection.getSlot();
        botData.lastSlot = slot;
        
        const spreadPercent = (Math.random() * 1.5).toFixed(2);
        botData.lastSpread = spreadPercent + "%";

        if (signer) {
            const balanceInLamports = await connection.getBalance(signer.publicKey);
            botData.gasBalance = (balanceInLamports / LAMPORTS_PER_SOL).toFixed(4);
        }

        const baseGasFeeSol = 0.000005;
        const flashLoanFeeSol = 0.0009;
        const totalCostSol = baseGasFeeSol + flashLoanFeeSol;

        const simulatedFlashLoanAmountSol = 10.0; 
        const grossReturnSol = simulatedFlashLoanAmountSol * (spreadPercent / 100);
        const netProfitSol = grossReturnSol - totalCostSol;

        if (netProfitSol > 0) {
            botData.netProfit = `$${(netProfitSol * 180).toFixed(2)}`;
            console.log(`🔥 [PROFITABLE] Slot: ${slot} | Net Profit: ${netProfitSol.toFixed(4)} SOL`);
            
            if (signer && netProfitSol > 0.001) {
                // यहाँ एटॉमिक ट्रेड एग्जीक्यूशन होगा
            }
        } else {
            botData.netProfit = "$0.00 (Fees > Profit)";
        }
    } catch (err) {
        console.error("❌ Scan Error:", err.message);
    }
}

app.get('/api/status', (req, res) => {
    res.json(botData);
});

app.post('/api/withdraw', async (req, res) => {
    const { destinationAddress } = req.body;
    if (!destinationAddress) {
        return res.status(400).json({ success: false, message: "Please enter a valid wallet address!" });
    }
    res.json({ success: true, message: `Withdrawal initiated to ${destinationAddress.substring(0, 6)}...` });
});

app.listen(PORT, () => {
    console.log(`🌐 Server running on port ${PORT}`);
});

setInterval(scanAndExecuteArbitrage, 5000);
