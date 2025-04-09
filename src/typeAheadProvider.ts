import * as vscode from 'vscode';
// import { detectLanguage } from './languageDetector';
import { translateText } from './translator';

export class TypeAheadProvider implements vscode.CompletionItemProvider {
    async provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
        // const range = document.getWordRangeAtPosition(position) || new vscode.Range(position, position);
        const textBeforeCursor = document. getText(new vscode.Range(new vscode.Position(position.line, 0), position));

        // const sourceLang = detectLanguage(textBeforeCursor);
        const sourceLang = 'en';
        const translation = await translateText(textBeforeCursor, sourceLang, 'fra_Latn');

        const item = new vscode.CompletionItem(`💡 ${translation}`, vscode.CompletionItemKind.Text);
        item.detail = `Translated from ${sourceLang}`;
        item.insertText = translation;

        return [item];
    }
}
