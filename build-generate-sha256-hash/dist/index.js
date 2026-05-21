import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: external "module"
const external_module_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("module");
;// CONCATENATED MODULE: ./build-generate-sha256-hash/index.js

const build_generate_sha256_hash_require = (0,external_module_namespaceObject.createRequire)(import.meta.url);

const core = build_generate_sha256_hash_require('@actions/core');
const build_generate_sha256_hash_crypto = build_generate_sha256_hash_require('crypto');
const fs = build_generate_sha256_hash_require('fs');

try {
    const filePath = core.getInput('file');
    const shasum = build_generate_sha256_hash_crypto.createHash('sha256');
    const fileStr = fs.readFileSync(filePath, 'utf8');
    shasum.update(fileStr);
    const hash = shasum.digest('hex');
    core.setOutput("hash", hash);
} catch(error) {
    core.setFailed(error.message);
}

