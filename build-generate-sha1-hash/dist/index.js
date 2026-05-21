/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
const core = require('@actions/core');
const crypto = require('crypto');
const fs = require('fs');

try {
    const filePath = core.getInput('file');
    const shasum = crypto.createHash('sha1');
    const fileStr = fs.readFileSync(filePath, 'utf8');
    shasum.update(fileStr);
    const hash = shasum.digest('hex');
    core.setOutput("hash", hash);
} catch(error) {
    core.setFailed(error.message);
}

