const fsPromises = require("fs").promises;
const path = require("path")

const fileOps = async () => {
    try {
      const data = await fsPromises.readFile( //This process is used to read the inside the folder
        path.join(__dirname, "files", "gig.txt"), "utf8"
      )
      console.log(data);

     await fsPromises.unlink(path.join(__dirname, "files", "gig.txt"))// This processs is used to delete files
     await fsPromises.writeFile(path.join(__dirname, "files", "promiseWrite.txt"), data)
     await fsPromises.appendFile(path.join(__dirname, "files", "promiseWrite.txt"), "\nNice to meet you!", "utf8");
     await fsPromises.rename(path.join(__dirname, "files", "promiseWrite.txt"), path.join(__dirname, "files", "promiseComplete.txt"))

     const Hoyee = await fsPromises.readFile(path.join(__dirname, "files", "promiseComplete.txt"), "utf8");
     console.log(Hoyee)


    } catch (error) {
       console.error(error)
    }
}

fileOps()