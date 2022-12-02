const fs = require("fs");
const path = require("path");
const Readable = require("stream").Readable;

const FOLDER = "./saved_images";

module.exports.writeToFile = (base64Img) => {
    const files = fs.readdirSync(FOLDER);

    console.log("writing...");
    console.log("Total files: ", files.length);
    const imgBuffer = Buffer.from(base64Img, "base64");

    const s = new Readable();

    s.push(imgBuffer);
    s.push(null);

    const image = `image_${files.length}`;
    s.pipe(fs.createWriteStream(`${FOLDER}/${image}.jpg`));
};

module.exports.readFiles = async (res) => {
    try {
        let fileNames = await fs.promises.readdir(FOLDER);

        // sort descending order based on modified time
        fileNames = fileNames
            .filter((fileName) => {
                const ext = fileName.split('.').pop();
                if ( ['jpg','png','jpeg'].includes(ext) ) {
                    return fileName
                }
            })
            .map((fileName) => {
                return {
                    name: fileName,
                    time: fs.statSync(`${FOLDER}/${fileName}`).mtime.getTime(),
                };
            })
            .sort((a, b) => {
                return a.time - b.time;
            })
            .map((file) => {
                return file.name;
            })
            .reverse();

        return await Promise.all(
            fileNames.map(async (fileName) => {
                return {id: fileName, src: await fs.promises.readFile(`${FOLDER}/${fileName}`, "base64")};
            })
        );
    } catch (err) {
        res.send(err.message);
    }
};

module.exports.deleteFromFolder = async(images, res) => {
    try {
        for ( let image of images ) {
            const fullPath = path.join(FOLDER, image)

            if ( fs.existsSync(fullPath) ) {
                await fs.promises.unlink(fullPath);
            }

        }
    } catch (err) {
        res.send(err.message);
    }
}