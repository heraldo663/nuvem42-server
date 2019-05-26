const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const AssetSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  encoding: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  root: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dir"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

AssetSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Asset", AssetSchema);
