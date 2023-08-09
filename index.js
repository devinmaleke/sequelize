const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const sequelize = new Sequelize ('sequelize', 'root', '',{
    dialect: 'mysql'
});

// async function myfunction() {
//     await sequelize.authenticate()
//     console.log("sukses bro")
// }

// myfunction();

// console.log("another task");

// sequelize.sync({ alert: true });

const User = sequelize.define('user',{
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING
    
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 21
    },
    WittCodeRocks:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
{
    freezeTableName: true,
    timestamps: false
});

User.sync({alter: true}).then(() => {
    return User.findAll({
        attributes: ['username', 'password']
    });
}).then((data) => {
    data.forEach(element => {
        console.log(element.toJSON()) 
    });
}).catch((err) => {
    console.log(err)
})