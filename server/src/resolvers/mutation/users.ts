import {AppContext} from "index";
import Logger from "../../utils/logger/logger";
import {User, UsersWithAuth} from "../../models/Users";
import {GraphQlRuntimeException} from "../../exceptions";

interface AddUsersInput {
    user: UsersWithAuth
}

interface UserResponse extends User {
}

const UsersResolver = {
    Mutation: {
        addUser: async (parent: Object, args: AddUsersInput, {services}: AppContext): Promise<UserResponse> => {
            try {
                const data = await services.UsersService.addUser(args.user);
                return data.data;
            } catch (e) {
                Logger.error("Error in addUser: " + e);
                throw new GraphQlRuntimeException("Error in addUser", e);
            }
        },
    },
};

export default UsersResolver;
