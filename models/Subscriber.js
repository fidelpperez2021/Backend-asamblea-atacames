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
    cedula: {
      type: String,
      required: true,
      unique: true, // importante
      index: true,  // importante
      match: [/^\d{10}$/, "La cédula debe tener 10 dígitos"],
    },
  },
  { timestamps: true }
);

// Refuerza el índice único
SubscriberSchema.index({ cedula: 1 }, { unique: true });

module.exports = mongoose.model("Subscriber", SubscriberSchema);
