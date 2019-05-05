const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const AssetSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
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
