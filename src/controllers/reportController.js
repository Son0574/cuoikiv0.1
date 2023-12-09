const crypto = require('crypto');
const nodemailer = require('nodemailer');

const Admin = require('../models/adminModel');
const Bill = require('../models/billModel');
const Customer = require('../models/customerModel');
const ProductBill = require('../models/productBillModel');
const Product = require('../models/productModel');
const Staff = require('../models/staffModel');

const getAnalysisReport = async (req, res) => {
    try {
        const listBill = await Bill.find();
        let totalReceivedMoney = 0;
        let totalOrders = listBill.length;
        let totalProducts = 0;
        let totalMoneyGive = 0;
        let totalMoneyBack = 0;

        listBill.forEach(bill => {
            totalReceivedMoney += bill.total_money_bill;
            totalProducts += bill.total_product_bill;
            totalMoneyGive += bill.money_give_bill;
            totalMoneyBack += bill.money_back_bill;
        });

        res.render('report/analysisReport', {
            listBill,
            totalReceivedMoney,
            totalOrders,
            totalProducts,
            totalMoneyGive,
            totalMoneyBack,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const postAnalysisReport = async (req, res) => {
    try {
        let filter = req.body.filter;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;
        let listBill = [];

        if (filter === 'today') {
            const today = new Date();
            const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

            listBill = await Bill.find({
                date_bill: { $gte: startOfDay, $lt: endOfDay }
            });
        } else if (filter === 'yesterday') {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const startOfDay = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
            const endOfDay = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate() + 1);

            listBill = await Bill.find({
                date_bill: { $gte: startOfDay, $lt: endOfDay }
            });
        } else if (filter === 'last7days') {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

            listBill = await Bill.find({
                date_bill: { $gte: sevenDaysAgo }
            });
        } else if (filter === 'thisMonth') {
            const firstDayOfMonth = new Date();
            firstDayOfMonth.setDate(1);
            const startOfDay = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth(), 1);
            const endOfDay = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 1);

            listBill = await Bill.find({
                date_bill: { $gte: startOfDay, $lt: endOfDay }
            });
        } else if (filter === 'custom' && startDate && endDate) {
            listBill = await Bill.find({
                date_bill: { $gte: new Date(startDate), $lt: new Date(endDate) }
            });
        }

        let totalReceivedMoney = 0;
        let totalOrders = listBill.length;
        let totalProducts = 0;

        listBill.forEach(bill => {
            totalReceivedMoney += bill.total_money_bill;
            totalProducts += bill.total_product_bill;
        });

        res.render('report/analysisReport', {
            listBill,
            totalReceivedMoney,
            totalOrders,
            totalProducts
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAnalysisReport,
    postAnalysisReport,
};