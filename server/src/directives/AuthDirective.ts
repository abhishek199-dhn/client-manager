import {AuthenticationError} from "apollo-server";
import {SchemaDirectiveVisitor} from "graphql-tools";
import {defaultFieldResolver, GraphQLObjectType, GraphQLField} from "graphql";

class AuthDirective extends SchemaDirectiveVisitor {
    public visitObject(type: GraphQLObjectType) {
        this.ensureFieldsWrapped(type);
    }

    public visitFieldDefinition(
        field: GraphQLField<any, any>) {
        this.ensureFieldWrapped(field);
    }

    ensureFieldsWrapped(objectType: GraphQLObjectType & Object) {
        // Mark the GraphQLObjectType object to avoid re-wrapping:
        // @ts-ignore
        if (objectType._authFieldsWrapped) return;
        // @ts-ignore
        objectType._authFieldsWrapped = true;

        const fields = objectType.getFields();

        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            this.ensureFieldWrapped(field);
        });
    }

    ensureFieldWrapped(field: GraphQLField<any, any>) {
        const {resolve = defaultFieldResolver} = field;
        field.resolve = async function (...args) {

            const context = args[2];
            const authenticator = context.aclContext.authenticator;

            const isVerified = await authenticator.verifyToken(context.aclContext.token);

            if (!isVerified) {
                throw new AuthenticationError("Invalid token!");
            }

            return resolve.apply(this, args);
        };
    }
}

export default AuthDirective;