'use strict';
import * as vscode from 'vscode';
import { EOL } from 'os';

function twoToFour(s: string, spacecount: number): string {
    for (let i = 0; i < spacecount; i ++)
        s = ' ' + s;
    return s;
}

function fourToTwo(s: string, spacecount: number): string {
    return s.substr(Math.ceil(spacecount / 2));
}

function nukeIndent(indentFunction: (string, number) => string) {
    const editor = vscode.window.activeTextEditor;
    const oldtext = editor.document.getText();

    // Prepare for nuking indentation
    const lines = [];
    for (let i = 0; i < editor.document.lineCount; i++)
        lines.push(editor.document.lineAt(i).text);

    for (let i = 0; i < lines.length; i++) {
        let s: string = lines[i];
        let count = 0;
        for (let j = 0; j < s.length; j++) {
            if (s.charAt(j) === ' ')
                count++;
            else
                break;
        }

        if (count > 0)
            lines[i] = indentFunction(s, count); // Nuke indentation
    }
    const newtext = lines.join(EOL);

    if (newtext !== oldtext) {
        // Apply edit
        editor.edit((edit: vscode.TextEditorEdit) => {
            const lastline = editor.document.lineAt(editor.document.lineCount - 1);
            edit.replace(new vscode.Range(0, 0, lastline.lineNumber, lastline.range.end.character), newtext);
        });
    }
}

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('twospacefourspace.twoToFour', () => {
        nukeIndent(twoToFour);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('twospacefourspace.fourToTwo', () => {
        nukeIndent(fourToTwo);
    }));
}

export function deactivate() {}
