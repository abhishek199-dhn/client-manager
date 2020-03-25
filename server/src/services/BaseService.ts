import mongoose, {Model, Types, Document} from "mongoose";
import {QueryFilters} from "index";
import Logger from "../utils/logger";

export interface BaseServiceOptions<IDocument extends Document> {
    model: Model<IDocument>;
}

export interface BaseServiceResponse<IDocument> {
    data: IDocument
}

class BaseService<IDocument extends Document> {
    options: BaseServiceOptions<IDocument>;

    constructor(options: BaseServiceOptions<IDocument>) {
        this.options = options;
    }

    protected getAll = async (
        filters: QueryFilters,
        queryObject?: any
    ): Promise<BaseServiceResponse<Array<IDocument>>> => {
        let {skip, limit, _id, ...others} = filters;

        skip = skip ? Number(skip) : null;
        limit = limit ? Number(limit) : null;

        const query = {
            ...others,
            ...queryObject
        };

        if (_id) {
            try {
                query._id = new mongoose.mongo.ObjectId(_id);
            } catch (error) {
                Logger.info("not able to generate mongoose id with content", _id);
            }
        }

        try {
            let items = await this.options.model
                .find(query)
                .skip(skip)
                .limit(limit);

            return {
                data: items
            };
        } catch (errors) {
            Logger.error("unable to fetch", errors);
            throw new Error("unable to fetch" + errors.message);
        }
    };

    protected insert = async (data: IDocument): Promise<BaseServiceResponse<IDocument>> => {
        try {
            let item = await this.options.model.create(data);
            if (item)
                return {
                    data: item
                };
        } catch (error) {
            Logger.error("unable to insert", error);
            throw new Error("unable to insert " + error.message);
        }
    };

    protected update = async (
        id: Types.ObjectId | string,
        data: Partial<IDocument>
    ): Promise<BaseServiceResponse<IDocument>> => {
        try {
            let item = await this.options.model.findByIdAndUpdate(id, data, {new: true});
            return {
                data: item
            };
        } catch (error) {
            Logger.error("unable to update", error);
            throw new Error("unable to update " + error.message);
        }
    };

    protected delete = async (id: string) => {
        try {
            return await this.options.model.findByIdAndDelete(id);
        } catch (error) {
            Logger.error("unable to delete", error);
            throw new Error("unable to delete " + error.message);
        }
    }
}

export default BaseService;