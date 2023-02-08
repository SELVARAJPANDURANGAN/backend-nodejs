const fs = require("fs");

const quote = "The CURRENT_TIMESTAMP function returns the current date and time, in a 'YYYY-MM-DD hh:mm:ss.mmm' format,Features :This function is used to find the current date and time.This function comes under Date Functions.This function doesn’t accept any parameter.This function can also be used as a default value in some codes.";

const [, , noOfFiles] = process.argv;

for (let i = 1; i <= noOfFiles; i++) {

fs.writeFileSync(`./filetask/23-oct-2022-1pm-${i}.txt`, quote, (err) => {
  console.log(`Completed writing file 23-oct-2022-1pm-${i}.txt`);
})};


fs.readdir("./filetask", (err, files) => {
  console.log("All file names:", files);
});