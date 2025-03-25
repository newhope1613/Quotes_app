import models from '../models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { User } = models;

const generateJWT = (id, email, role) => {
	return jwt.sign({ id, role, email }, process.env.SECRET_KEY, {
		expiresIn: '24h',
	});
};

class UserController {
	async login(req, res) {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ where: { email } });
			if (!user) {
				return res.error('Такого пользователя не существует', 404);
			}
			let comparePassword = bcrypt.compareSync(password, user.password);
			if (!comparePassword) {
				return res.error('Указан неверный пароль', 404);
			}
			const token = generateJWT(user.id, user.email, user.role);
			return res.json({ token });
		} catch (e) {
			console.error('Ошибка при входе', e);
			return res.error('Ошибка сервера', 500);
		}
	}

	async registration(req, res) {
		try {
			const { email, password, role } = req.body;

			if (!email || !password) {
				return res.error('Некоректный пароль или email');
			}
			const candidate = await User.findOne({ where: { email } });
			if (candidate) {
				return res.error('Такой пользователь уже существует', 404);
			}
			const hashPassword = await bcrypt.hash(password, 10);
			const user = await User.create({ email, role, password: hashPassword });
			const token = generateJWT(user.id, user.email, user.role);
			return res.json({ token });
		} catch (e) {
			console.error('Не удалось войти ', e);
			res.error('Не удалось выполнить вход ', 404);
		}
	}

	async checkAuth(req, res) {
		try {
			return res.json({ user: req.user });
		} catch (e) {
			console.error('Ошибка при проверке авторизации:', e);
			return res.error('Ошибка сервера', 500);
		}
	}
}

export default new UserController();
