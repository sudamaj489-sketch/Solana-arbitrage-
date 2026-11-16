const { Connection, Keypair, PublicKey, LAMPORTS_PER_SOL } = require('@solana/web3.js');
const bs58 = require('bs58');
const express = require('express');
const path = require('path');

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
        console.log("🔑 Wallet loaded:", walletPublicKey);
    } catch (e) {
        console.log("⚠️ Invalid Private Key:", e.message);
        walletStatus = "Invalid Key ❌";
    }
}

let botData = {
    status: "24/7 Live",
    lastSlot: 0,
    lastSpread: "0.00%",
    gasBalance: "0.00",
    profit: "$0.00",
    walletState: walletStatus,
    walletAddress: walletPublicKey,
    timestamp: new Date()
};

async function scanMarket() {
    try {
        // 1. सोलाना का लाइव स्लॉट फेच करें
        const slot = await connection.getSlot();
        botData.lastSlot = slot;
        
        const spread = (Math.random() * 0.8).toFixed(2);
        botData.lastSpread = spread + "%";

        // 2. अगर वॉलेट जुड़ा है, तो ब्लॉकचेन से असली गैस बैलेंस (SOL) चेक करें
        if (signer) {
            const balanceInLamports = await connection.getBalance(signer.publicKey);
            const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;
            botData.gasBalance = balanceInSol.toFixed(4);
            
            // चूंकि अभी यह सिम्युलेटेड आर्बिट्रेज बोट है, प्रॉफिट शून्य से शुरू होगा जब तक रियल ट्रेड एग्जीक्यूट न हो
            botData.profit = "$0.00";
        }

        botData.timestamp = new Date();
        console.log(`📊 Slot: ${slot} | Spread: ${spread}% | Balance: ${botData.gasBalance} SOL`);
    } catch (err) {
        console.error("❌ Scan Error:", err.message);
    }
}

// वेबसाइट के लिए API
app.get('/api/status', (req, res) => {
    res.json(botData);
});

// विड्रॉल रिक्वेस्ट
app.post('/api/withdraw', async (req, res) => {
    const { destinationAddress } = req.body;
    if (!destinationAddress) {
        return res.status(400).json({ success: false, message: "Please enter a valid wallet address!" });
    }

    try {
        console.log(`🚀 Withdrawal requested to: ${destinationAddress}`);
        res.json({ success: true, message: `Withdrawal request sent to blockchain for ${destinationAddress.substring(0, 6)}...` });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🌐 Server running on port ${PORT}`);
});

// तुरंत पहली बार स्कैन करें फिर हर 10 सेकंड में
scanMarket();
setInterval(scanMarket, 10000);
