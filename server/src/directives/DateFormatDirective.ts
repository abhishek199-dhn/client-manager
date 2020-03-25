import moment from "moment";
import {SchemaDirectiveVisitor} from "graphql-tools";
import {defaultFieldResolver, GraphQLField, GraphQLString} from "graphql";

class DateFormatDirective extends SchemaDirectiveVisitor {

    public visitFieldDefinition(field: GraphQLField<any, any>) {
        const {resolve = defaultFieldResolver} = field;
        const {defaultFormat} = this.args;

        field.args.push({
            astNode: undefined,
            defaultValue: defaultFormat,
            description: "date format",
            extensions: undefined,
            name: "format",
            type: GraphQLString
        });

        field.resolve = async function (
            source,
            {format, ...otherArgs},
            context,
            info,
        ) {
            const date = await resolve.call(this, source, otherArgs, context, info);
            // If a format argument was not provided, default to the optional
            // defaultFormat argument taken by the @date directive:
            return moment(date).format(format || defaultFormat);
        };

        field.type = GraphQLString;
    }
}

export default DateFormatDirective;