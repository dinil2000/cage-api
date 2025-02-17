const Product = require('../models/product');

exports.createProduct = async (req, res) => {
    try {
        console.log("Received body:", req.body);  // Debugging line

        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            specifications: req.body.specifications, // Directly assign the object
            image: req.file ? {
                data: req.file.buffer,
                contentType: req.file.mimetype
            } : undefined
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        const formattedProducts = products.map(product => {
            return {
                ...product._doc,
                image: product.image ? {
                    contentType: product.image.contentType,
                    data: product.image.data ? product.image.data.toString('base64') : null
                } : null
            };
        });

        res.json(formattedProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const formattedProduct = {
            ...product._doc,
            image: product.image ? {
                contentType: product.image.contentType,
                data: product.image.data.toString('base64')
            } : null
        };

        res.json(formattedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updateData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
           specifications:req.body.specifications
        };

        if (req.file) {
            updateData.image = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};