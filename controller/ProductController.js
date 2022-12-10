const Category = require("../Models/Category");
const Product = require("../Models/Product")

const addProduct = async (req, res, next) => {
    try {
        const { title, attribute, Category_id, description, regularprice, currentPrice, qty } = req.body
        const images = []
        req.files.map((item) => {
            images.push(item.filename)
        })
        const product = new Product({
            title,
            attribute,
            images: images,
            Category_id,
            description,
            regularprice,
            currentPrice,
            qty
        })
        const result = await product.save();
        return res.status(201).json(result)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}

const delete_product = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({ result: " paroduct delete sucssfully" })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const update_product = async (req, res) => {
    try {
        const { title, attribute, Category_id, description, regularprice, currentPrice, qty } = req.body

        var data = await Product.findByIdAndUpdate(req.params.id, {
            title,
            attribute,
            Category_id,
            description,
            regularprice,
            currentPrice,
            qty
        }, { new: true });
        return res.status(201).json({ result: data })

    } catch (error) {
        return res.status(500).json(error);
    }
}

const getallProduct = async (req, res, next) => {
    try {
        const result = await Product.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: "Category_id",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $lookup: {
                    from: "attributes",
                    localField: "attribute.attribute_id",
                    foreignField: "_id",
                    let: {
                        attribute_values_ids: "$attribute.value"
                    },
                    pipeline: [{
                        $project: {
                            _id: 0,
                            Name: 1,
                            value: {
                                $filter:
                                {
                                    input: "$value",
                                    as: "grade",
                                    cond: { $in: ["$$grade._id", "$$attribute_values_ids"] },
                                }
                            },
                        },
                    },
                    {
                        $project: {
                            "id": 1,
                            "attribute_name": "$Name",
                            "attribute_value": { $first: "$value.name" },
                        }
                    }
                    ],
                    as: "attributes"
                }
            },
            {
                $project: {
                    "title": "$title",
                    "category": { $first: "$category.name" },
                    "attributes": "$attributes",
                    "regularprice": "$regularprice",
                    "currentPrice": "$currentPrice",
                    "qty": "$qty",
                    "description": "$description"

                }
            }
        ]).limit(5)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const product_find = async (req, res) => {
    try {
        var c = await Category.findOne({ name: req.params.category })
        const result = await Product.find({ Category_id: c.id })
        if (!result) {
            return res.status(404).json("product not find")
        }
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = { addProduct, getallProduct, delete_product, update_product, product_find }



