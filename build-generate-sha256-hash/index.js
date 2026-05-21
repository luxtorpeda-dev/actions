import * as core from '@actions/core';
import crypto from 'node:crypto';
import fs from 'node:fs';

try {
    const filePath = core.getInput('file');
    const shasum = crypto.createHash('sha256');
    const fileStr = fs.readFileSync(filePath, 'utf8');
    shasum.update(fileStr);
    const hash = shasum.digest('hex');
    core.setOutput("hash", hash);
} catch(error) {
    core.setFailed(error.message);
}
