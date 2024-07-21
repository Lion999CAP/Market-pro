import { Router } from "express";
import { sample_prods, sample_tags } from "../data";
import asyncHandler from "express-async-handler";
import { ProdModel } from "../models/prod.model";
import admin from "../middlewares/admin.mid";

const router = Router();

router.get(
    "/seed",
    asyncHandler(async (req, res) => {
        const foodsCount = await ProdModel.countDocuments();
        if (foodsCount > 0) {
            res.send("Sample foods already seeded");
            return;
        }

        await ProdModel.create(sample_prods);
        res.send("Sample foods seeded successfully");
    })
);

router.get(
    "/",
    asyncHandler(async (req, res) => {
        const foods = await ProdModel.find();
        res.send(foods);
    })
);

router.post("/", admin, asyncHandler(
    async (req, res) => {
        const { name, price, tags, favorite, imageUrl} = req.body;

        const food = new ProdModel({
            name,
            price,
            tags: tags.split ? tags.split(',') : tags,
            favorite,
            imageUrl,
        });

        await food.save();

        res.send(food);
    }
));

router.put("/", admin, asyncHandler(
    async (req, res) => {
        
        const { id, name, price, tags, favorite, imageUrl} = req.body;

        await ProdModel.updateOne(
            { _id: id },
            {
                name,
                price,
                tags: tags.split ? tags.split(',') : tags,
                favorite,
                imageUrl
            }
        )

        res.send();
    }
))

router.delete(
    "/:prodId",
    admin,
    asyncHandler(async (req, res) => {
        const { prodId } = req.params;
        await ProdModel.deleteOne({ _id: prodId });
        res.send();
    })
);

router.get(
    "/tags",
    asyncHandler(async (req, res) => {
        const tags = await ProdModel.aggregate([
            { $unwind: "$tags" },
            { $group: { _id: "$tags", count: { $sum: 1 } } },
            { $project: { _id: 0, name: "$_id", count: "$count" } },
        ]).sort({ count: -1 });

        const all = {
            name: "All",
            count: await ProdModel.countDocuments(),
        };
        tags.unshift(all);
        res.send(tags);
    })
);

router.get("/search/:searchTerm", async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, "i");
    const foods = await ProdModel.find({ name: { $regex: searchRegex } });
    res.send(foods);
});



router.get(
    "/tag/:tagName",
    asyncHandler(async (req, res) => {
        const foods = await ProdModel.find({ tags: req.params.tagName });
        res.send(foods);
    })
);

router.get(
    "/:foodId",
    asyncHandler(async (req, res) => {
        const food = await ProdModel.findById(req.params.foodId);
        res.send(food);
    })
);

export default router;
