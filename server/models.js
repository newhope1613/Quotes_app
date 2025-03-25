import sequelize from './db.js';
import { DataTypes } from 'sequelize';

const Quote = sequelize.define('quote', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	text: { type: DataTypes.STRING, allowNull: false },
	author: { type: DataTypes.STRING, allowNull: false },
	category: {
		type: DataTypes.ENUM('мотивация', 'жизнь', 'любовь', 'мудрость'),
		allowNull: false,
	},
});

const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	email: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
		validate: { isEmail: true },
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	role: {
		type: DataTypes.ENUM('User', 'Admin'),
		defaultValue: 'User',
	},
});

User.hasMany(Quote);
Quote.belongsTo(User);

export default { Quote, User };
