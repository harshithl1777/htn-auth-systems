const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: './server/config/.env' });

// TODO: Import required routers
const cardsRouter = require('./server/routers/cards');
const authRouter = require('./server/routers/auth');
const jwtMiddleware = require('./server/routers/middleware');

const app = express();

if (process.env.NODE_ENV !== 'production') app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/health', (req, res) => res.sendStatus(200));

// TODO: Use routers and middleware
app.use('/api/auth', authRouter);
app.use(jwtMiddleware);
app.use('/api/cards', cardsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.info(`Listening on port ${port}`));
