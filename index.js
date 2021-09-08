const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: './server/config/.env' });

const cardsRouter = require('./server/routers/cards');

const app = express();

if (process.env.NODE_ENV !== 'production') app.use(cors());

app.use('/api/cards', cardsRouter);

app.get('/api/health', (req, res) => res.sendStatus(200));

app.use(express.static(path.join(__dirname, 'client', 'dist')));

const port = process.env.PORT || 5000;
app.listen(port, () => console.info(`Listening on port ${port}`));
