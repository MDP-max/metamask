// Replace these with your Biconomy API credentials
const API_KEY = 'adfa1b65-8147-4c97-85ab-b59d28c5bf6b';
const API_SECRET = '4384335c-2a59-446e-a0f3-9f403d772944';

// Bot state
let isRunning = false;

// API endpoint
const API_BASE_URL = 'https://api.biconomy.com';

// Function to place an order
async function placeOrder(symbol, side, price, quantity) {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY,
                'X-API-SECRET': API_SECRET
            },
            body: JSON.stringify({
                symbol,
                side,
                price,
                quantity,
                type: 'LIMIT'
            })
        });
        const data = await response.json();
        console.log('Order placed:', data);
        return data;
    } catch (error) {
        console.error('Error placing order:', error);
    }
}

// Function to get the order book
async function getOrderBook(symbol) {
    try {
        const response = await fetch(`${API_BASE_URL}/orderbook?symbol=${symbol}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching order book:', error);
    }
}

// Main bot logic
async function botLogic() {
    const symbol = 'MDGUSDT';
    while (isRunning) {
        try {
            // Fetch order book data
            const orderBook = await getOrderBook(symbol);
            const bestAsk = parseFloat(orderBook.asks[0][0]); // Lowest sell price
            const bestBid = parseFloat(orderBook.bids[0][0]); // Highest buy price

            // Step 1: Place buy order slightly below the best ask
            const buyPrice = (bestAsk - 0.0001).toFixed(4);
            const buyQuantity = 100; // Replace with desired quantity
            await placeOrder(symbol, 'BUY', buyPrice, buyQuantity);

            // Step 1b: Sell slightly less than the bought quantity
            const sellPrice = (parseFloat(buyPrice) + 0.0001).toFixed(4);
            const sellQuantity = (buyQuantity - 1.2317).toFixed(4);
            await placeOrder(symbol, 'SELL', sellPrice, sellQuantity);

            // Wait for 14 minutes
            await new Promise(resolve => setTimeout(resolve, 14 * 60 * 1000));

            // Step 2: Buy with 1000 USDT worth of MDG above the best bid
            const largeBuyPrice = (bestBid + 0.0001).toFixed(4);
            const largeBuyQuantity = (1000 / largeBuyPrice).toFixed(4);
            await placeOrder(symbol, 'BUY', largeBuyPrice, largeBuyQuantity);

            // Step 2b: Sell slightly less MDG
            const largeSellQuantity = (largeBuyQuantity - (2 / largeBuyPrice)).toFixed(4);
            await placeOrder(symbol, 'SELL', largeBuyPrice, largeSellQuantity);
        } catch (error) {
            console.error('Error in bot logic:', error);
        }
    }
}

// Start and Stop functions
function startBot() {
    if (!isRunning) {
        isRunning = true;
        botLogic();
        document.getElementById('botStatus').textContent = 'Running';
        console.log('Bot started');
    }
}

function stopBot() {
    if (isRunning) {
        isRunning = false;
        document.getElementById('botStatus').textContent = 'Stopped';
        console.log('Bot stopped');
    }
}

// Button event listeners
document.getElementById('startButton').addEventListener('click', startBot);
document.getElementById('stopButton').addEventListener('click', stopBot);
