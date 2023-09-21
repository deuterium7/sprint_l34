const { db, DataTypes } = require("../db");

const Todo = db.define(
	'Todo',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		completed: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
			allowNull: false,
		},
		created_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: true,
		},
		updated_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: true,
		},
	},
	{
		tableName: 'todos',
		underscored: true,
		timestamps: false,
	},
);

module.exports = Todo;