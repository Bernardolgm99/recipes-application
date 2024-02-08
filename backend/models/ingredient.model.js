module.exports = (sequelize, DataTypes) => {
    const ingredient = sequelize.define('ingredient',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    arg: true,
                    msg: 'This ingredient name is already taken.'
                },
                validate: {
                    notEmpty: { msg: `Please provide a name!` }
                }
            },
            calories: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    notEmpty: { msg: `Please provide a calories!` }
                }
            },
            proteins: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    notEmpty: { msg: `Please provide a proteins!` }
                }
            },
            total_fat: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    notEmpty: { msg: `Please provide a total_fat!` }
                }
            },
            saturated_fat: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    notEmpty: { msg: `Please provide a saturated_fat!` }
                }
            },
            trans_fat: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    notEmpty: { msg: `Please provide a trans_fat!` }
                }
            },
            total_carbohydrates: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    notEmpty: { msg: `Please provide a total_carbohydrates!` }
                }
            },
            sugars: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    notEmpty: { msg: `Please provide a sugars!` }
                }
            },
            dietary_fiber: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    notEmpty: { msg: `Please provide a dietary_fiber!` }
                }
            },
        });
    return ingredient;
}
