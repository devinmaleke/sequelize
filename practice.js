const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const sequelize = new Sequelize ('sequelize', 'root', '',{
    dialect: 'mysql'
});
const Op = Sequelize.Op
// async function myfunction() {
//     await sequelize.authenticate()
//     console.log("sukses bro")
// }

// myfunction();

// console.log("another task");

// sequelize.sync({ alert: true });

const Student = sequelize.define('student',{
    student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4,20]
        }
    },
    favorite_class: {
        type: DataTypes.STRING(25),
        defaultValue: 'Computer Science'
    },
    school_year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subscribed_to_Wittcode:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
{
    freezeTableName: true,
    timestamps: false
});

Student.sync({alter: true}).then(() => {

    return Student.findAll({

        attributes: [
            'school_year',
            [sequelize.fn('COUNT', sequelize.col('school_year')), 'num_students']
        ],
    //      attributes: ['name'],
    //      where:{
    //     [Op.or]: {favorite_class: 'Computer Science', subscribed_to_Wittcode: true} 
    //  }
     group: 'school_year'
    })
    //    return Student.bulkCreate([
    //     {
    //         name: 'Devin',
    //         favorite_class: 'Workout',
    //         school_year: '2019',
    //         subscribed_to_Wittcode: false
    //     },
    //     {
    //         name: 'Darryl',
    //         favorite_class: 'Pilot',
    //         school_year: '2017',
    //         subscribed_to_Wittcode: false
    //     },
    //     {
    //         name: 'Daniel',
    //         school_year: '2019',
    //         subscribed_to_Wittcode: false
    //     },
    //     {
    //         name: 'Julia',
    //         favorite_class: 'Dance',
    //         school_year: '2019',
    //         subscribed_to_Wittcode: false
    //     },
    //     {
    //         name: 'Anin',
    //         favorite_class: 'Design',
    //         school_year: '2017',
    //         subscribed_to_Wittcode: false
    //     },
    //     {
    //         name: 'Nate',
    //         school_year: '2020',
    //     },
    //     {
    //         name: 'Brian',
    //         school_year: '2019',
    //     },
    //     {
    //         name: 'Whit',
    //         favorite_class: 'Sing',
    //         school_year: '2020',
    //         subscribed_to_Wittcode: false
    //     },
    //    ])
}).then((data) => {
    data.forEach(element => {
       console.log(element.toJSON()) 
    });

})
.catch((err) => {
    console.log(err)
})