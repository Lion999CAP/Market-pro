import { Schema, model } from "mongoose";

export interface Prod{
    id: string;
    name: string;
    price: number;
    tags: string[];
    favorite: boolean;
    stars: number;
    imageUrl: string;
}

export const ProdSchema = new Schema<Prod>(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        tags: { type: [String] },
        favorite: { type: Boolean, default: false },
        stars: { type: Number, default: 3 },
        imageUrl: { type: String, required: true },
    },{ 
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        },
        timestamps: true
    }
);

export const ProdModel = model<Prod>('prod', ProdSchema);