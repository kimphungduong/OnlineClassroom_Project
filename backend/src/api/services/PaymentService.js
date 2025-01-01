
const { checkPaid } = require('../../api/helpers/checkPayment');
const Payment = require('../models/Payment');
const Cart = require('../models/Cart');
const Course = require('../models/Course');

class PaymentService {

    // Lấy giao dịch theo ID
    async getPaymentById(paymentId) {
        try {
            return await Payment.findById(paymentId);
        } catch (error) {
            throw new Error(`Error retrieving payment by ID: ${error.message}`);
        }
    }

    // Tạo giao dịch mới
    async createPayment(userId, itemIds) {
        try {
            //Kiểm tra itemIds có tồn tại không
            const items = await Cart.find({ courseIds: { $in: itemIds } })
            .populate('course');
            if (items.length !== itemIds.length) {
                throw new Error("Invalid item IDs");
            }
            const newPayment = new Payment({
                userId,
                amount: items.reduce((total, item) => total + item.price, 0),
                paymentMethod: "bank",
                courses: items.map(item => item.courseId),
                status: "pending",
            });

            await newPayment.save();
            return newPayment;
        } catch (error) {
            throw new Error(`Error creating payment: ${error.message}`);
        }
    }

    // Xử lý thanh toán
    async processPayment(paymentId) {
        try {
            const payment = await Payment.findById(paymentId);
            if (!payment) {
                throw new Error("Payment not found");
            }

            if (payment.status !== "pending") {
                throw new Error("Payment is not pending");
            }

            const timeout = 5 * 60 * 1000; // 5 phút
            const checkInterval = 10 * 1000; // Kiểm tra mỗi 10 giây
            let elapsed = 0;

            while (elapsed < timeout) {
                const isPaid = await checkPaid(payment.amount, payment.description);

                if (isPaid.success) {
                    payment.status = "completed";
                    await payment.save();

                    return payment;
                }

                await new Promise(resolve => setTimeout(resolve, checkInterval));
                elapsed += checkInterval;
            }

            payment.status = "failed";
            await payment.save();
            throw new Error("Payment timeout exceeded");
        } catch (error) {
            throw new Error(`Error processing payment: ${error.message}`);
        }
    }

    async getAllPayments() {
        try {
            return await Payment.find().sort({ createdAt: -1 });
        } catch (error) {
            throw new Error(`Error retrieving all payments: ${error.message}`);
        }
    }
}

module.exports = new PaymentService();