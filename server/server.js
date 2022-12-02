const express = require("express");
const app = express();
const cors = require("cors");

const { writeToFile, readFiles, deleteFromFolder } = require("./utils/file");


app.listen(8000, () => console.log('Listening on Port 8000'));

//#region configure express
app.use(cors());
app.use(express.json({
    extended: true,
    limit: '50mb'
}));
//#endregion

app.get("/files", async (req, res) => {
    const files = await readFiles(res);
    res.send(files);
})


// save to a folder
app.post("/upload", async (req, res) => {
    const {image} = req.body;
    try {
        writeToFile(image);

        res.json({ msg: "Uploaded successfully" });
    } catch (err) {

        res.send(err)
    }
});

// delete from a folder
app.delete("/delete", async (req, res) => {
    const {images} = req.body;
    console.log('hit delete');
    try {
        deleteFromFolder(images, res);
        res.json({ msg: "Deleted successfully" });
    } catch (err) {
        res.send(err)
    }
});