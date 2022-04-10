const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("./sequelize");

module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define(
        'Article',
        {
            id_articol: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            titlu:{
                type: DataTypes.STRING,
                validator: {
                    len: {
                        args: [5,100],
                        msg:'Titlu trebuie sa fie mai mare de 5caractere!' 
                    }
                }
            },
            rezumat:{
                    type: DataTypes.STRING,
                    validator: {
                        len: {
                            args: [10,1000],
                            msg:'Rezumatul trebuie sa fie mai mare de 10 caractere !' 
                        }
                    }
                
            },
            data:{
                type: DataTypes.STRING,
            }
        }
    );
    return Article;
}