const express = require('express');
const { postQuestion, getQuestions, postAnswer, getQuestionWithAnswers } = require('../controllers/questionController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/questions', protect, postQuestion);
router.get('/questions', getQuestions);
router.post('/questions/:questionId/answers', protect, postAnswer);
router.get('/questions/:questionId', getQuestionWithAnswers);

module.exports = router;
