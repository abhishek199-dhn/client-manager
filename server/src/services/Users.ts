import {QueryFilters} from "index";
import {User, UserDoc, UsersWithAuth} from "../models/Users";
import BaseService, {BaseServiceOptions} from "./BaseService";

export interface UsersServiceOptions extends BaseServiceOptions<UserDoc> {
}

class UsersService extends BaseService<UserDoc> {
    constructor(options: UsersServiceOptions) {
        super(options);
    }

    getUsers = async (filters: QueryFilters, queryObject?: Object) => {
        return this.getAll(filters, queryObject);
    };

    addUser = (data: UsersWithAuth) => {
        return this.insert(<UserDoc>data);
    };

    isAuthenticated = async (username: string, password: string): Promise<{ user?: User, isVerified: boolean }> => {
        const users = await this.getUsers({}, {username});
        if (users && Array.isArray(users.data) && users.data.length) {
            // @ts-ignore
            const isVerified = users.data[0].validPassword(password);
            return {
                isVerified,
                user: users.data[0]
            }
        }
        return {
            isVerified: false,
            user: null
        };
    };
}

export default UsersService;