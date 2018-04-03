export default (sequelize, DataTypes) => {
    const Team = sequelize.define('teams', {
        username: {
            type: DataTypes.STRING,
            unique: true
        }
    });

    Team.associate = models => {
        Team.belongsToMany(models.User, {
            through: 'User',
            foreignKey: {
                name: 'teamId',
                field: 'team_id'
            }
        });
        Team.belongsTo(models.User, { foreignKey: 'owner' });
    };

    return Team;
};
