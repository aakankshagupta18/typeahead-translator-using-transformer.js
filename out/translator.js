"use strict";
// import { pipeline } from '@xenova/transformers';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateText = translateText;
// let translator: any = null;
const vscode = __importStar(require("vscode"));
// import { pipeline } from '@xenova/transformers';
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
async function translateText(text, sourceLang = 'en', targetLang) {
    try {
        const translateWorkerPath = path_1.default.join(__dirname, 'translate-worker.mjs');
        const translator = (0, child_process_1.spawn)('node', [translateWorkerPath]);
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
    }
    catch (err) {
        vscode.window.showErrorMessage("Translation failed: " + err);
    }
}
//# sourceMappingURL=translator.js.map