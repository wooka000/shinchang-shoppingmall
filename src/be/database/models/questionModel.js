import { model } from "mongoose";
import { QuestionSchema } from "../schema/questionSchema.js";

const Question = model("question", QuestionSchema);

export class QuestionModel {
  async findAllQuestions() {
    const questions = await Question.find({}).sort({ createAt: -1 });
    return questions;
  }

  async findById(questionId) {
    const question = await Question.findOne({ _id: questionId });
    return question;
  }

  async create({ title, content, author }) {
    const createdNewQuestion = await Question.create({
      title,
      content,
      author,
    });
    return createdNewQuestion;
  }

  async update({ questionId, update }) {
    const searchQuestionId = { _id: questionId };
    const option = { returnOriginal: false };

    const updatedQuestion = await Question.findOneAndUpdate(
      searchQuestionId,
      update,
      option
    );
    return updatedQuestion;
  }

  async deleteByQuestionId(questionId) {
    const result = await Question.deleteOne({ _id: questionId });
    return result;
  }
}

const questionModel = new QuestionModel();

export { questionModel };
