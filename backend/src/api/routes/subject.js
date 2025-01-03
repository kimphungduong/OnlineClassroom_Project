const express = require('express');
const  SubjectController  = require('../controllers/SubjectController');

const router = express.Router();

// Route để lấy danh sách thể loại
router.get('/', SubjectController.getAllSubjects);

module.exports = router;
