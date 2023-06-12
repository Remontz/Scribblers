const { kMaxLength } = require("buffer");
const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Story Title is required"],
      MaxLength: [25, "Max Length for Title is 25 characters"],
    },
    genre: [
      {
        type: String,
        enum: [
          "Narrative",
          "Fiction",
          "Science Fiction",
          "Mystery",
          "Essay",
          "Fantasy",
          "Non-Fiction",
          "Romance",
          "Prose",
          "Horror",
          "Memoir",
          "Article",
          "YA",
          "Comedy",
          "Drama",
          "Tall Tale",
          "Legend",
          "Fairy Tale",
        ],
        required: true,
      },
    ],
    stars: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        comment: {
          content: {
            type: String,
            minLength: [3, "Comments must be longer than 3 characters."],
            MaxLength: [125, "Comments may be no longer than 125 characters."],
          },
          author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        },
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      minLength: [500, "Stories must be at least 500 characters"],
      maxLength: [
        10000,
        "Short stories may only be 500-10,000 characters in length.  Consider drafting a novel and uploading as a PDF.",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Story", storySchema);
