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
