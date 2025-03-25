import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next();
	}

	try {
		const token = req.headers.authorization?.split(' ')[1]; // Получаем токен из заголовка Authorization

		if (!token) {
			return res.status(401).json({ message: 'Не авторизован' });
		}

		const decoded = jwt.verify(token, process.env.SECRET_KEY); // Декодируем токен
		req.user = decoded; // Добавляем данные пользователя в req.user
		next();
	} catch (e) {
		return res.status(401).json({ message: 'Ошибка авторизации' });
	}
};
