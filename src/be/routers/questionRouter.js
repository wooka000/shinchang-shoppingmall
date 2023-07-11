import { Router } from "express";
import { questionService } from "../services/questionService.js";

const questionRouter = Router();

// 모든 질문 조회
questionRouter.get("/", async (req, res) => {
  try {
    const questions = await questionService.getAllQuestions();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 질문 상세 조회
questionRouter.get("/:questionId", async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const question = await questionService.getQuestionById(questionId);
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 질문 작성
questionRouter.post("/", async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const question = await questionService.createQuestion(
      title,
      content,
      author
    );
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 질문 수정
questionRouter.put("/:questionId", async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const { title, content } = req.body;
    const question = await questionService.setQuestion(
      questionId,
      title,
      content
    );
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 질문 삭제
questionRouter.delete("/:questionId", async (req, res) => {
  try {
    const questionId = req.params.questionId;
    await questionService.deleteQuestion(questionId);
    res.json({ result: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { questionRouter };
