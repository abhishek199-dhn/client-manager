import mongoose, {Schema, Document} from "mongoose";

export interface Client {
    _id: any;
    name: string;
    title: string;
    companyName: string
    address: string;
    industry: string;
    createdAt: string;
    updatedAt: string;
}

export interface ClientDoc extends Client, Document {

}

class Clients {
    modelName = "clients";

    initSchema() {
        const schema = new Schema({
            name: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true
            },
            companyName: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true
            },
            industry: {
                type: String
            },
        }, {timestamps: true});

        mongoose.model<ClientDoc>(this.modelName, schema);
    }

    getInstance() {
        return mongoose.model<ClientDoc>(this.modelName);
    }
}

export default Clients;