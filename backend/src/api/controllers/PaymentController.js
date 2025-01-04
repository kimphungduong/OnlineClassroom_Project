const CourseService = require('../services/CourseService.js');
const PaymentService = require('../services/PaymentService.js');


class PaymentController{
    async createPayment(req, res) {
        try {
            const { ItemsIds } = req.body;
            const userId = req.user.userId;
            const newPayment = await PaymentService.createPayment(ItemsIds, userId);
            res.json(newPayment);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getPayment(req, res) {
        try {
            const { paymentId } = req.params;
            const payment = await PaymentService.getPaymentById(paymentId);
            console.log(payment);
            res.status(200).json(payment);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async processPayment(req, res) {
        try {
            const { paymentId } = req.params;
            const payment = await PaymentService.processPayment(paymentId);
            res.status(200).json({
                message: "Payment completed successfully",
                payment,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async cancelPayment(req, res) {
        try {
            const { paymentId } = req.body;
            const payment = await PaymentService.cancelPayment(paymentId);
            res.status(200).json({
                message: "Payment cancelled successfully",
                payment,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
        
}
module.exports = new PaymentController;