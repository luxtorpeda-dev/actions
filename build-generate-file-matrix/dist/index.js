import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: external "module"
const external_module_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("module");
;// CONCATENATED MODULE: ./build-generate-file-matrix/index.js

const build_generate_file_matrix_require = (0,external_module_namespaceObject.createRequire)(import.meta.url);

const core = build_generate_file_matrix_require('@actions/core');
const { context, GitHub } = build_generate_file_matrix_require('@actions/github');
const fs = build_generate_file_matrix_require('fs').promises;
const path = build_generate_file_matrix_require('path');

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

