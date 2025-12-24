const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Mock siparişler
const orders = [
    { id: 1, userId: 1, item: 'Laptop' },
    { id: 2, userId: 2, item: 'Phone' }
];

app.get('/orders', async (req, res) => {
    // Kullanıcı bilgilerini ekleyerek gönder
    const ordersWithUsers = await Promise.all(
        orders.map(async order => {
            try {
                const userRes = await axios.get(`http://user-service:3001/users/${order.userId}`);
                return { ...order, user: userRes.data };
            } catch {
                return { ...order, user: null };
            }
        })
    );
    res.json(ordersWithUsers);
});

const PORT = 3002;
app.listen(PORT, () => console.log(`Order service running on port ${PORT}`));
