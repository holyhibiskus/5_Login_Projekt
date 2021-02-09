
module.exports = function (sequelize, DataTypes) {
    const story = sequelize.define("story", {
        idstory: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        theme: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        creator : {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0
        },
        text : {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        }
    },{
        freezeTableName: true,
        tableName: 'stories',
        timestamps: true
    });

    story.sync().then(function() {
        console.log('Story table successfully');
    }, function(err) {
        console.error('An error occurred while creating table : ' + err.stack);
    });

    return story;
};
