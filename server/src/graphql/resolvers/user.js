import bcrypt from 'bcrypt';

import errorFormater from '../../helpers/errorFormater';
import { tryLogin } from '../../helpers/auth';

export default {
    Query: {
        getUser: (parent, { id }, { models }) =>
            models.User.findOne({ where: { id } }),
        allUsers: (parent, args, { models }) => models.User.findAll()
    },
    Mutation: {
        login: (parent, { email, password }, { models, SECRET, SECRET2 }) =>
            tryLogin(email, password, models, SECRET, SECRET2),
        register: async (parent, { password, ...args }, { models }) => {
            try {
                const hashedPassword = await bcrypt.hash(password, 12);
                const user = await models.User.create({
                    ...args,
                    password: hashedPassword
                });
                return {
                    successful: true,
                    user
                };
            } catch (err) {
                console.log(err);
                return {
                    successful: false,
                    errors: errorFormater(err, models)
                };
            }
        }
    }
};
