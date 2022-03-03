let questionsSchema = mongoose.Schema({
  question_id: Number,
  productId: string,
  question_body: string,
  question_date: string,
  asker_name: string,
  question_helpfullness: Number,
  reported: boolean,
  answers: [{
    answer_id: Number,
    answer_body: string,
    answer_date: string,
    answerer_name: string,
    answer_helpfulness: Number,
    photos: [string]
  }]
});