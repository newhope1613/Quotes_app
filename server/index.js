import express from 'express';
import cors from 'cors';
import sequelize from './db.js';
import routes from './routes/index.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', routes);
app.get('/', (reg, res) => {
	res.json({ message: 'Hello world' });
});
const PORT = process.env.PORT || 3000;
const start = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		app.listen(PORT, () => {
			console.log('Server has been starting on ' + PORT);
		});
	} catch (e) {
		console.error(e);
	}
};

start();
