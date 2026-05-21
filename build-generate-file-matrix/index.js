import * as core from '@actions/core';
import fs from 'node:fs/promises';
import path from 'node:path';

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
