module.exports = (sequelize, DataTypes) => {
    const recipe = sequelize.define('recipe',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {arg:true, msg: 'This recipe name is already taken.'},
                validate: {
                    notEmpty: { msg: `Please provide a name!` }
                }
            },
            image: {
                type: DataTypes.STRING,
            },
            observation: {
                type: DataTypes.STRING,
            },
        });
    return recipe;
}
