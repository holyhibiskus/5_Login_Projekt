
module.exports = function (sequelize, DataTypes) {
    const cars = sequelize.define("cars", {
        idCar: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        powerKw : {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        fin : {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        image : {
            type : DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        }
    },{
        freezeTableName: true,
        tableName: 'cars',
        timestamps: true
    });

    cars.sync().then(function() {
        console.log('Car table successfully');
    }, function(err) {
        console.error('An error occurred while creating table : ' + err.stack);
    });

    return cars;
};