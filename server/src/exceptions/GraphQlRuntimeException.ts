import { ApolloError } from "apollo-server";

export class GraphQlRuntimeException extends ApolloError {
  constructor(message: string, properties?: { [key: string]: any }) {
    super(message, "SOMETHING_WENT_WRONG", properties);
    Object.defineProperty(this, "name", { value: "GraphQlRuntimeException" });
  }
}
