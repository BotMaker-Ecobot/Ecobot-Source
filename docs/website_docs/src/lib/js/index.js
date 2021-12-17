import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		message: 'Hello World'
	});
});

app.get('/search/', (req, res) => {
	res.json({
		searchAmount: 1,
	});
});

app.post('/search/', (req, res) => {
	res.json({
		searchTerm: req.body,
		title: 'Hello',
		content: 'Hello'
	});
});

const port = 1337;
app.listen(port, () => {
	console.log(`listening at http://localhost:${port}`);
});
