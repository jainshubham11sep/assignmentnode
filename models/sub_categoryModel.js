module.exports = (sequelize, DataTypes) => {

    const sub_category = sequelize.define("sub_category", {
        sub_cat_id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        sub_cat_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })

    return sub_category;
}
