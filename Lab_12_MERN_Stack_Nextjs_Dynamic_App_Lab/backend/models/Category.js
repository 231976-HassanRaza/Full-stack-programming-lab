const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, unique: true, lowercase: true },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

categorySchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, "-");
  }
  next();
});

module.exports = mongoose.model("Category", categorySchema);
