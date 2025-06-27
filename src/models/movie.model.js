import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Movies = sequelize.define(
    "movies", {
        title: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        director: {
            type: DataTypes.STRING,
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }
)

export default Movies;