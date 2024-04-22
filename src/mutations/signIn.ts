import {comparePassword} from "../modules/auth.js";
import {MutationResolvers} from "../types.js";

export const signIn: MutationResolvers['signIn'] = async (_, {username, password}, {dataSources}) => {
    const user = await dataSources.db.user.findUnique({
        where: {username},
    });

    if (!user) {
        return {
            code: 404,
            message: 'User not found',
            success: false,
            user: null
        }
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
        return {
            code: 401,
            message: 'Invalid password',
            success: false,
            user: null
        }
    }

    return {
        code: 200,
        message: 'Sign in successful',
        success: true,
        user: {
            id: user.id,
            username: user.username
        }
    }
}