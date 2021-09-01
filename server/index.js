const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './config/.env' });

const app = express();

app.use(cors());

app.get('/test', (req, res) => {
	res.send('Test complete!');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.info(`Listening on port ${port}`));
