const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const DirSchema = mongoose.Schema({
  title: {
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
    ref: "Dir",
    default: null
  },
  assets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

DirSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Dir", DirSchema);
