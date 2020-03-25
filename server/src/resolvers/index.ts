import merge from "lodash/merge"
import UsersQueryResolver from "./query/users";
import ClientsQueryResolver from "./query/clients";
import AuthMutationResolver from "./mutation/auth";
import UsersMutationResolver from "./mutation/users";
import HobbiesQueryResolver from "./query/transactions";
import ClientsMutationResolver from "./mutation/clients";
import HobbiesMutationResolver from "./mutation/transactions";

const mergedResolvers = [
    UsersMutationResolver,
    HobbiesMutationResolver,
    HobbiesQueryResolver,
    UsersQueryResolver,
    ClientsQueryResolver,
    AuthMutationResolver,
    ClientsMutationResolver
];

export default merge.apply(this, mergedResolvers);
