import express from "express";
import fs from "fs";
import path from "path";
import FileModel from "../models/model.js";
export const router = express.Router();
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  return res.send("HELLO WORLD");
});

router.get("/getModel", async (req, res) => {
  try {
    let result = await FileModel.findOne().sort({ createdAt: -1 }).limit(1);
    if (result) {
      console.log("Results", result);
      const filePath = path.join(
        path.dirname(new URL(import.meta.url).pathname),
        "../../client/public/scene.glb"
      );
      console.log("This is the filepath", filePath);
      fs.writeFile(filePath, result.data, (err) => {
        if (err) {
          console.log("Failed to write file due to ", err);
          throw err;
        }
        console.log("Successfully Written");
      });
      return res.status(200).json({
        name: result.filename,
        description: result.description,
        mimeType: result.mimeType,
      });
    }
    return res.status(400).json({ message: "No records found", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

router.post("/saveModel", upload.single("file"), async (req, res) => {
  try {
    console.log("The Req.file", req.file, req.body.name);
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
    const file = req.file;
    console.log(typeof file);
    //  const fileData = new Readable();
    const fileData = Buffer.from(file.buffer);
    // fileData.push(file.buffer);
    // fileData.push(null);
    const result = new FileModel({
      filename: req.body.name,
      mimeType: req.body.mimetype,
      data: fileData,
      description: req.body.description,
    });
    let saveFile = result.save();
    if (saveFile) {
      console.log("File Saved");
      res.status(200).send(saveFile);
    }
  } catch (error) {
    console.error("Failed to save data", error);
    res.status(500).send("Error uploading file" + error);
  }
});

router.delete("/deleteModel", async (req, res) => {
  try {
    let result = await FileModel.deleteMany({});
    if (result.deletedCount == 0) {
      res.status(404).json({ Message: "No records found to be deleted" });
    } else {
      res
        .status(200)
        .json({ message: `No. of Rows Deleted: ${result.deletedCount}` });
    }
  } catch (error) {
    res.status(500).send("Failed to delete records");
  }
});
