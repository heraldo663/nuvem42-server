/* eslint-disable class-methods-use-this */
const Dir = require("../models/Dir");

class DirController {
  async index(req, res) {
    const dir = await Dir.find({ owner: req.user._id });

    return res.status(200).json({
      data: {
        dir
      }
    });
  }

  async show(req, res) {
    const { id } = req.body;
    const dir = await Dir.find({ _id: id, owner: req.user._id });

    return res.status(200).json({
      data: {
        dir
      }
    });
  }

  async store(req, res) {
    const { title } = req.body;
    const newDir = new Dir({
      title,
      owner: req.user._id
    });
    return newDir.save().then(dir => {
      return res.status(201).json({
        data: {
          dir
        }
      });
    });
  }

  async update(req, res) {
    const { title } = req.body;
  }

  async delete(req, res) {
    const { id } = req.body;
  }
}

module.exports = new DirController();
