const Question = require('../models/Question');
const Answer = require('../models/Answer');

exports.postQuestion = async (req, res) => {
    const { title, description } = req.body;
    try {
        const question = new Question({ title, description, user: req.user.id });
        await question.save();
        res.json(question);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getQuestions = async (req, res) => {
    try {
        const questions = await Question.find().populate('user', 'username');
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.postAnswer = async (req, res) => {
    const { content } = req.body;
    const { questionId } = req.params;
    try {
        const answer = new Answer({ content, question: questionId, user: req.user.id });
        await answer.save();
        res.json(answer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getQuestionWithAnswers = async (req, res) => {
    const { questionId } = req.params;
    try {
        const question = await Question.findById(questionId).populate('user', 'username');
        const answers = await Answer.find({ question: questionId }).populate('user', 'username');
        res.json({ question, answers });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
