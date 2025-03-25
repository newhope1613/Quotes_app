import models from '../models.js';
const { Quote } = models;

class QuoteController {
	async create(req, res) {
		try {
			const { text, author, category } = req.body;
			const quote = await Quote.create({ text, author, category });
			return res.status(200).json({ message: 'Цитата успешна создана', quote });
		} catch (e) {
			console.error(e);
			return res.status(500).json({ message: 'Не удалось создать цитату' });
		}
	}

	async getOne(req, res) {
		try {
			console.log('Запрос на случайную цитату');
			const quotes = await Quote.findAll();
			const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
			if (!randomQuote) {
				return res.status(500).json({ message: 'Цитата не найдена' });
			}

			return res.status(200).json(randomQuote);
		} catch (e) {
			console.error('Ошибка при получении случайной цитаты:', e);
			return res.status(500).json({ message: 'Ошибка сервера' });
		}
	}

	async getAll(req, res) {
		try {
			const response = await Quote.findAll();

			if (!response || response.length === 0) {
				return res.status(500).json({ message: 'Цитаты не найдены' });
			}

			res.json(response);
		} catch (e) {
			console.error('Ошибка при получений всех цитат', e);
			return res.json({ message: 'Ошибка сервера' });
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params;
			const deleted = await Quote.destroy({ where: { id } });

			if (!deleted) {
				return res.status(404).json({ message: 'Цитата не найдена' });
			}

			return res.json({ message: 'Цитата удалена', deletedId: id });
		} catch (e) {
			console.error(e);
			return res.status(500).json({ message: 'Ошибка сервера' });
		}
	}
}

export default new QuoteController();
