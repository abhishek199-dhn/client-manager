import {AppContext, QueryFilters} from "index";
import {User} from "../../models/Users";
import Logger from "../../utils/logger/logger";
import {GraphQlRuntimeException} from "../../exceptions";

interface UsersArgs {
    filters: QueryFilters | null
}

interface UserResponse extends User {
}

const UsersResolver = {
    Query: {
        users: async (parent: Object, args: UsersArgs, {services}: AppContext): Promise<Array<UserResponse>> => {
            try {
                const data = await services.UsersService.getUsers(args.filters || {});
                return data.data;
            } catch (e) {
                Logger.error("Error in Users: " + e);
                throw new GraphQlRuntimeException("Error in Users", e);
            }
        },
    },
};

export default UsersResolver;
