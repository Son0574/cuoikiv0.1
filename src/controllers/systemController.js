const crypto = require('crypto');
const nodemailer = require('nodemailer');

const Admin = require('../models/adminModel');
const Bill = require('../models/billModel');
const Customer = require('../models/customerModel');
const ProductBill = require('../models/productBillModel');
const Product = require('../models/productModel');
const Staff = require('../models/staffModel');

const getProductSystem = async (req, res) => {
    try {
        const productsInSession = req.session.products || [];
        
        res.render('system/productSystem', { products: productsInSession });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const postAddProduct = async (req, res) => {
    const { productCode } = req.body;

    try {
        const product = await Product.findOne({ code_product: productCode });

        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }

        if (!req.session.products) {
            req.session.products = [];
        }

        const existingProductIndex = req.session.products.findIndex(
            (item) => item._id.toString() === product._id.toString()
        );

        if (existingProductIndex !== -1) {
            req.session.products[existingProductIndex].quantity += 1;
        } else {
            const productWithQuantity = Object.assign({}, product.toObject(), { quantity: 1 });
            req.session.products.push(productWithQuantity);
        }

        res.redirect('/system/');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const postSetQuantityProduct = async (req, res) => {
    const { productCode, quantity } = req.body;

    try {
        const productIndex = req.session.products.findIndex(prod => prod.code_product === productCode);

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại trong danh sách' });
        }

        req.session.products[productIndex].quantity = quantity;

        res.redirect('/system/');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getPaymentSystem = async (req, res) => {
    try {
        const productsInSession = req.session.products || [];

        let totalProduct = 0;
        let totalMoney = 0;

        productsInSession.forEach(product => {
            totalProduct += product.quantity;
            totalMoney += product.price_sell_product * product.quantity;
        });

        res.render('system/paymentSystem', { products: productsInSession, totalProduct, totalMoney });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const postPaymentSystem = async (req, res) => {
    try {
        const productsInSession = req.session.products || [];
        const staff = req.session.staff;

        const {
            nameCustomer,
            phoneCustomer,
            addressCustomer,
            moneyGive,
            moneyBack,
            totalProduct,
            totalMoney,
        } = req.body;


        let customer = await Customer.findOne({ phoneCustomer });
        if (!customer) {
            customer = new Customer({
                phone_customer: phoneCustomer,
                name_customer: nameCustomer,
                address_customer: addressCustomer
            });
            await customer.save();
        }

        const newBill = new Bill({
            total_money_bill: totalMoney,
            total_product_bill: totalProduct,
            money_give_bill: moneyGive,
            money_back_bill: moneyBack,
            date_bill: new Date(),
            customer: customer,
            staff: staff,
        });

        await newBill.save();

        productsInSession.forEach(async product => {
            const productBill = new ProductBill({
                bill: newBill,
                product: product, 
                quantity_product_bill: product.quantity,
            });

            await productBill.save();
        });

        req.session.products = null; 

        res.status(201).json({ message: 'Bill added successfully', bill: newBill });
    } catch (err) {
        res.status(500).json({ message: 'Failed to add bill', error: err.message });
    }
};

const postClearProduct = async (req, res) => {
    try {
        req.session.products = null; 

        res.redirect('/system/');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getProductSystem,
    postAddProduct,
    getPaymentSystem,
    postPaymentSystem,
    postClearProduct,
};