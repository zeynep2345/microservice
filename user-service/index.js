const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const users = [
    { id: 1, name: 'Ali' },
    { id: 2, name: 'Ayşe' }
];

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));
