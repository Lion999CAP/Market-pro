"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdModel = exports.ProdSchema = void 0;
var mongoose_1 = require("mongoose");
exports.ProdSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    tags: { type: [String] },
    favorite: { type: Boolean, default: false },
    stars: { type: Number, default: 3 },
    imageUrl: { type: String, required: true },
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
});
exports.ProdModel = (0, mongoose_1.model)('prod', exports.ProdSchema);
