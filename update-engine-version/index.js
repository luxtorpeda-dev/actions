import { createRequire } from "module";
const require = createRequire(import.meta.url);

import * as core from '@actions/core';
import { context } from '@actions/github';
const fs = require('fs').promises;
const path = require('path');
import { Octokit, App } from "octokit";

const packagesEnginesPath = 'engines';

console.log('Starting.');

function updateDownload(download, oldTag, newTag, oldFile, newFile) {
    if(download.url && oldTag && newTag) {
        download.url = download.url.replace(oldTag, newTag);
    }

    if(download.file) {
        if(oldFile && newFile && download.file === oldFile) {
            download.file = newFile;
        } else if(oldTag && newTag) {
            download.file = download.file.replace(oldTag, newTag);
        }
    }
}

async function run() {
    try {
        const engineName = core.getInput('engineName');
        const newTag = core.getInput('newTag');
        const newHash = core.getInput('newHash');
        const oldTag = core.getInput('oldTag');
        const oldFile = core.getInput('oldFile');
        const newFile = core.getInput('newFile');
        const updateDownloads = core.getInput('updateDownloads') === 'true';

        if(!updateDownloads) {
            const envJsonPath = path.join(packagesEnginesPath, engineName, 'env.json');

            const envJsonStr = await fs.readFile(envJsonPath, 'utf-8');
            const envData = JSON.parse(envJsonStr);

            if(newTag) {
                envData.COMMIT_TAG = newTag;
            } else if(newHash) {
                envData.COMMIT_HASH = newHash;
            }

            await fs.writeFile(envJsonPath, JSON.stringify(envData, null, 4));
        }

        const packagesJsonPath = path.join('metadata', 'packagessniper_v2.json');
        const packagesJsonStr = await fs.readFile(packagesJsonPath, 'utf-8');
        const packagesJson = JSON.parse(packagesJsonStr);

        for(let engineData of packagesJson.engines) {
            if(engineData.internal_engine_name === engineName) {
                if(newTag) {
                    engineData.version = newTag;
                } else if(newHash) {
                    engineData.version = newHash;
                }

            }
        }

        if(updateDownloads) {
            for(let gameData of packagesJson.games) {
                if(gameData.download) {
                    for(let download of gameData.download) {
                        updateDownload(download, oldTag, newTag, oldFile, newFile);
                    }
                }
            }

            if(packagesJson.default_engine && packagesJson.default_engine.download) {
                for(let download of packagesJson.default_engine.download) {
                    updateDownload(download, oldTag, newTag, oldFile, newFile);
                }
            }
        }

        await fs.writeFile(packagesJsonPath, JSON.stringify(packagesJson, null, 4));
    }
    catch (error) {
        core.setFailed(error.message);
    }
}

run();
