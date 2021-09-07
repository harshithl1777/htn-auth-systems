const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: './server/config/.env' });

const cardsRouter = require('./server/routes/cards');

const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') app.use(cors());
app.use('/api/cards', cardsRouter);

app.get('/api/health', (req, res) => res.sendStatus(200));

if (process.env.NODE_ENV === 'production')
	app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.listen(port, () => console.info(`Listening on port ${port}`));
