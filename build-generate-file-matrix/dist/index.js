/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
const core = require('@actions/core');
const { context, GitHub } = require('@actions/github');
const fs = require('fs').promises;
const path = require('path');

console.log('Starting.');

async function run() {
    try {
        const folderName = core.getInput('name');
        const extension = '.tar.xz';

        const files = await fs.readdir(folderName);
        console.log(files);
        const matrix = {
            include: []
        };
        
        for(let i = 0; i < files.length; i++) {
            matrix.include.push({
                name: path.basename(files[i], extension),
                fileName: path.join(folderName, files[i]),
                extension:  extension
            });
        }
        
        
        core.setOutput('matrix', JSON.stringify(matrix));
    }
    catch (error) {
        core.setFailed(error.message);
    }
}

run();

