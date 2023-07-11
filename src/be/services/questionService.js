import { questionModel } from "../database/index.js";

class QuestionService {
  async getAllQuestions() {
    const questions = await questionModel.findAllQuestions();
    return questions;
  }

  async getQuestionById(questionId) {
    const question = await questionModel.findById(questionId);
    return question;
  }

  async createQuestion(title, content, author) {
    const question = await questionModel.create({
      title,
      content,
      author,
    });
    return question;
  }

  async setQuestion(questionId, title, content) {
    const updatedQuestion = await questionModel.update({
      questionId,
      update: { title, content },
    });
    return updatedQuestion;
  }

  async deleteQuestion(questionId) {
    const { deletedCount } = await questionModel.deleteByQuestionId(questionId);

    if (deletedCount === 0) {
      throw new Error(`${questionId} 제품의 삭제에 실패하였습니다`);
    }

    return { result: "success" };
  }
}

const questionService = new QuestionService();

export { questionService };
