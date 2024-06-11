const fs = require('fs');
const path = require('path');

const redColor = '\x1b[31m';
const greenColor = '\x1b[32m';
const waringColor = '\x1b[33m';

const imageFolder = process?.argv[2];
const directoryRoot = process?.argv[3];

async function searchFiles(directory, searchText, searchedDirs = new Set()) {
    if (searchedDirs.has(directory)) {
        return [];
    }
    searchedDirs.add(directory);
    // process.stdout.write(directory + "\n" + waringColor + "Starting the process ");
    const files = await fs.promises.readdir(directory);
    const subFilesPromises = files.map(file => {
        const filePath = path.join(directory, file);
        return new Promise(async (resolve, reject) => {
            try {
                const stats = await fs.promises.stat(filePath);
                if (stats.isDirectory()) {


                    const subFiles = await searchFiles(filePath, searchText, searchedDirs);
                    resolve(subFiles);
                } else {
                    const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
                    let content = '';
                    readStream.on('data', chunk => {
                        content += chunk;
                    });
                    readStream.on('end', () => {
                        if (content.includes(searchText)) {
                            resolve(filePath);
                        } else {
                            resolve(null);
                        }
                    });
                    readStream.on('error', err => {
                        reject(err);
                    });
                }
            } catch (err) {
                reject(err);
            }
        });
    });

    const subFilesArrays = await Promise.all(subFilesPromises);
    const subFiles = subFilesArrays.flat().filter(Boolean);
    return subFiles;
}

async function deleteFilesIfNotReferenced(files, directoryRoot) {
    let totalFileDelete = 0;
    for (let index in files) {
        try {
            percentComplete = Math.ceil(((1 + Number(index)) / totalFiles) * 100);
            const file = files[index];
            currentFile = file;
            const fileFormat = file.split('.')[0].replace('@2x', '').replace('@3x', '');
            const imageAssets = imageFolder.split('/');
            const parentFolder = imageAssets[imageAssets.length - 1];
            const textSearch = parentFolder + fileFormat.split(parentFolder)[1];
            const result = await searchFiles(directoryRoot, textSearch);
            ;
            if (result.length === 0 && ["JPG", "PNG", "JPEG", "MP3", "WAV"].includes(file.split(".")[1].toUpperCase())) {
                const pathAssets = path.join(__dirname, file).replace('/node_modules/clean-assets-master', '');
                await fs.promises.unlink(pathAssets);
                totalFileDelete++;
                console.log(greenColor, `\nFile ${file} deleted successfully`);
            }
        } catch (err) {
            console.error('Error deleting file:', err);
        }
    }
    return totalFileDelete;
}

async function findFiles(directory) {
    const filePaths = [];
    const files = await fs.promises.readdir(directory);
    for (const file of files) {
        const filePath = path.join(directory, file);
        const stats = await fs.promises.stat(filePath);
        if (stats.isFile()) {
            if (file !== '.DS_Store') {
                // process.stdout.write(filePath + "\n" + waringColor + "Starting the process ");
                filePaths.push(filePath);
            }
        } else if (stats.isDirectory()) {
            const subFiles = await findFiles(filePath);
            filePaths.push(...subFiles);
        }
    }
    return filePaths;
}

var totalFiles = 0;
var percentComplete = 0;
var currentFile = "";

async function main() {
    try {

        if (!directoryRoot || !imageFolder) {
            console.log(redColor, "directory source or target undefined");
            return;
        }
        process.stdout.write(waringColor + "Starting the process...");

        // Tạo một mảng chứa các ký tự dấu chấm để tạo hiệu ứng "chạy"
        const dots = [' .', ' ..', ' ...'];
        let index = 0;
        const interval = setInterval(() => {
            process.stdout.clearLine();  // Xóa dòng trước đó
            process.stdout.cursorTo(0); // Di chuyển con trỏ về đầu dòng
            process.stdout.write(waringColor + `${currentFile}\nStarting the process ${Math.ceil(percentComplete)}%`); // In thông báo với dấu chấm
            index = (index + 1) % dots.length; // Chuyển sang ký tự dấu chấm tiếp theo
        }, 100); // Thay đổi tốc độ hiển thị dấu chấm tại đây nếu cần

        const files = await findFiles(imageFolder);
        totalFiles = files.length;
        let totalFileDelete = await deleteFilesIfNotReferenced(files, directoryRoot);
        clearInterval(interval); // Dừng hiệu ứng "chạy" sau khi xong
        process.stdout.clearLine();  // Xóa dòng trước đó
        process.stdout.cursorTo(0); // Di chuyển con trỏ về đầu dòng
        process.stdout.write(waringColor + `Starting the process 100%`); // In thông báo với dấu chấm
        if (totalFileDelete == 0) {
            console.log(waringColor, "\nNot found file delete!");
            console.log(greenColor, "\nProcess completed successfully.");
            return;
        }
        console.log(greenColor, `\n${totalFileDelete} file had been deleted`);
        console.log(greenColor, "\nProcess completed successfully.");
    } catch (err) {
        console.error('Error:', err);
    }
}

main();
