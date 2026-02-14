const mongoose = require("mongoose");

const SubscriberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true, // importante
      index: true,  // importante
      match: [/^\S+@\S+\.\S+$/, "Email inválido"],
    },
  },
  { timestamps: true }
);

// (Opcional pero recomendable) refuerza el unique index
SubscriberSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("Subscriber", SubscriberSchema);
