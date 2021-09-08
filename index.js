const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: './server/config/.env' });

const cardsRouter = require('./server/routers/cards');

const app = express();

if (process.env.NODE_ENV !== 'production') app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/cards', cardsRouter);

app.get('/health', (req, res) => res.sendStatus(200));

const port = process.env.PORT || 5000;
app.listen(port, () => console.info(`Listening on port ${port}`));
