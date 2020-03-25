import bcrypt from "bcrypt";
import mongoose, {Schema, Document} from "mongoose";
import {generateHash} from "../utils/utils";

export interface User {
    _id: any;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface UsersWithAuth extends User {
    username: string;
    password: string
}

export interface UserDoc extends UsersWithAuth, Document {

}

interface UsersSchemaMethods {
    generateHash: (password: string) => string,
    validPassword: (password: string) => boolean
}

class Users {
    modelName = "users";

    initSchema() {
        const schema = new Schema<UsersSchemaMethods>({
            name: {
                type: String,
                required: true,
            },
            username: {
                type: String,
                required: true,
                index: {
                    unique: true
                }
            },
            password: {
                type: String,
                required: true
            }
        }, {timestamps: true});

        // hash the password
        schema.methods.generateHash = generateHash;

        // checking if password is valid
        schema.methods.validPassword = function (password: string) {
            return bcrypt.compareSync(password, this.password);
        };

        // Document middlewares
        schema.pre<UserDoc>("save", function (next) {
            if (this.isModified("password")) {
                this.password = generateHash(this.password);
            }
            next();
        });

        mongoose.model<UserDoc>(this.modelName, schema);
    }

    getInstance() {
        return mongoose.model<UserDoc>(this.modelName);
    }
}

export default Users;