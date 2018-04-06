export default (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isAlphanumeric: {
                    args: true,
                    msg: 'The username must only contain letters and numbers'
                },
                len: {
                    args: [3, 25],
                    msg: 'The username must be between 3 to 25 characters.'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Invalid email'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [5, 100],
                    msg: 'The password must be between 5 to 100 characters.'
                }
            }
        }
    });

    User.associate = models => {
        User.belongsToMany(models.Team, {
            through: 'member',
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            }
        });
        // N: M
        User.belongsToMany(models.Channel, {
            through: 'channel_member',
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            }
        });
    };

    return User;
};
