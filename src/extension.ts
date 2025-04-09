// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { TypeAheadProvider } from './typeAheadProvider';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  
	console.log('Congratulations, your extension "aipowered-livetranslate" is now active!');
	 debugger;
	try {
		const provider = new TypeAheadProvider();
		const selector = { scheme: 'file', language: 'plaintext' };

		context.subscriptions.push(
			vscode.languages.registerCompletionItemProvider(selector, provider, ' ', ' ')
		);
	}
	catch (err) {
		vscode.window.showErrorMessage("Error" + err);
	}

}

// This method is called when your extension is deactivated
export function deactivate() { }
