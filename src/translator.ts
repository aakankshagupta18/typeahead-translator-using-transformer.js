// import { pipeline } from '@xenova/transformers';

// let translator: any = null;

import * as vscode from 'vscode';
// import { pipeline } from '@xenova/transformers';
import { spawn } from 'child_process';
import path from 'path';

export async function translateText(text: string, sourceLang: string = 'en', targetLang: string): Promise<any> {
    try {
        const translateWorkerPath = path.join(__dirname, 'translate-worker.mjs');
        const translator = spawn('node', [translateWorkerPath]);

        translator.stdout.on('data', (data) => {
            const result = JSON.parse(data.toString());
            console.log('Translation:', result);
            return result[0].translation_text;
        });

        // Handle error output
        translator.stderr.on('data', (data) => {
            console.error('Error from child process:', data.toString());
        });

        // Handle child process exit
        translator.on('exit', (code) => {
            if (code !== 0) {
                console.error(`Child process exited with code ${code}`);
            }
        });


        translator.stdin.write(JSON.stringify({
            text: text,
            src_lang: sourceLang,
            tgt_lang: targetLang
        }));

        translator.stdin.end();

    } catch (err) {
        vscode.window.showErrorMessage("Translation failed: " + err);
    }

    
}
