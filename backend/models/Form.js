const mongoose = require("mongoose");

const fieldSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: {
    type: String,
    enum: ["text", "email", "number", "textarea", "select", "checkbox", "radio", "date"],
    required: true,
  },
  label: { type: String, required: true },
  placeholder: { type: String, default: "" },
  required: { type: Boolean, default: false },
  options: [{ type: String }], // for select, radio, checkbox
});

const formSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    fields: [fieldSchema],
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Form", formSchema);
