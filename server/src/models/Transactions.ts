import mongoose, {Schema, Document} from "mongoose";

export interface ClientTransaction {
    _id: any;
    amount: number;
    merchant: string;
    clientId: string
    itemsPurchased: string;
    createdAt: string;
    updatedAt: string;
}

export interface ClientTransactionDoc extends ClientTransaction, Document {

}

class Transactions {
    modelName = "transactions";

    initSchema() {
        const schema = new Schema({
            itemsPurchased: {
                type: String,
                required: true,
            },
            amount: {
                type: Number,
                required: true
            },
            merchant: {
                type: String,
                required: true,
            },
            clientId: {
                type: String,
                required: true
            },
        }, {timestamps: true});

        mongoose.model<ClientTransactionDoc>(this.modelName, schema);
    }

    getInstance() {
        return mongoose.model<ClientTransactionDoc>(this.modelName);
    }
}

export default Transactions;