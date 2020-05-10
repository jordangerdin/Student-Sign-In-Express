module.exports = (sequelize, DataTypes) => {

    // Student Model for database
    let Student = sequelize.define('Student', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }, starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }, present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })

    // Create Table
    Student.sync({force: false}).then( () => {
        console.log('synced student table')
    })

    return Student
}