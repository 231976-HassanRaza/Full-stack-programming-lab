const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    image: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tags: [{ type: String }],
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

blogSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
