const Asset = require("../models/Asset");
const fs = require("fs");
const config = require("../../config");

class AssetController {
  async index(req, res) {
    const assets = await Asset.find({ owner: req.user._id });

    return res.status(200).json({
      data: {
        assets
      }
    });
  }

  async show(req, res) {
    const { assetId } = req.body;
    const asset = await Asset.find({
      _id: assetId,
      owner: req.user._id
    });

    return res.send(asset);
  }

  async store(req, res) {
    let dirName = req.user.username.split(" ");
    dirName = dirName.join("-");

    const newAsset = new Asset({
      name: req.file.originalname,
      mimetype: req.file.mimetype,
      encoding: req.file.encoding,
      filename: req.file.filename,
      size: req.file.size,
      root: req.body.dirId,
      owner: req.user.id,
      url: `${process.env.APP_URL}media/${dirName}/${req.file.filename}`
    });

    await newAsset.save();

    return res.status(201).json({
      data: {
        newAsset
      }
    });
  }

  async update(req, res) {
    const { name } = req.body;
    const { id } = req.param;

    const Asset = await Asset.findOneAndUpdate(
      id,
      {
        name
      },
      { new: true }
    );

    return res.status(200).json({
      data: {
        dir
      }
    });
  }

  async delete(req, res) {
    const asset = await Asset.findById(req.params.id);
    let dirName = req.user.username.split(" ");
    dirName = dirName.join("-");
    fs.unlink(`${config.storage.baseDir}/${dirName}/${asset.filename}`, err =>
      console.log(err)
    );
    await asset.delete();
    res.send({ success: true });
  }
}

module.exports = new AssetController();
