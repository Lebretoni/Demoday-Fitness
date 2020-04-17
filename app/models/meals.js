const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mealSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  meal: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
});
const Meal = mongoose.model('Meal', mealSchema, 'meals');
module.exports = Meal;
