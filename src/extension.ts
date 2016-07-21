'use strict';
import * as vscode from 'vscode';
import { EOL } from 'os';

// Dirty hack to ignore leftover selection after twoToFour
// Don't have much choice
let usedSelection = false;
let useSelection = true;
let oldAnchor;
let oldWasEmpty = true;
function onSelectChange(e: vscode.TextEditorSelectionChangeEvent) {
    useSelection = true;
    if (usedSelection) {
        if (vscode.window.activeTextEditor.selection.isEmpty)
            useSelection = false;
    }
    else {
        if (oldWasEmpty && vscode.window.activeTextEditor.selection.anchor.isEqual(oldAnchor))
            useSelection = false;
    }

    oldAnchor = vscode.window.activeTextEditor.selection.anchor;
    oldWasEmpty = vscode.window.activeTextEditor.selection.isEmpty;
}

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

    // Handling selection
    let oldtext: string;
    let firstline: vscode.TextLine;
    let lastline: vscode.TextLine;
    if (!useSelection || editor.selection == null || editor.selection.isEmpty) {
        if (editor.document.lineCount <= 0)
            return;
        firstline = editor.document.lineAt(0);
        lastline = editor.document.lineAt(editor.document.lineCount - 1);
        oldtext = editor.document.getText();
        usedSelection = false;
    }
    else {
        firstline = editor.document.lineAt(editor.selection.start.line);
        lastline = editor.document.lineAt(editor.selection.end.line);
        oldtext = editor.document.getText(new vscode.Range(firstline.lineNumber, 0, lastline.lineNumber, lastline.range.end.character));
        usedSelection = true;
    }
    oldWasEmpty = vscode.window.activeTextEditor.selection.isEmpty;
    oldAnchor = vscode.window.activeTextEditor.selection.anchor;

    // Prepare for nuking indentation
    const lines = [];
    for (let i = firstline.lineNumber; i <= lastline.lineNumber; i++)
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
        editor.edit((edit: vscode.TextEditorEdit) =>
            edit.replace(new vscode.Range(firstline.lineNumber, 0, lastline.lineNumber, lastline.range.end.character), newtext)
        );
    }
}

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('twospacefourspace.twoToFour', () =>
        nukeIndent(twoToFour)
    ));
    context.subscriptions.push(vscode.commands.registerCommand('twospacefourspace.fourToTwo', () =>
        nukeIndent(fourToTwo)
    ));

    vscode.window.onDidChangeTextEditorSelection(onSelectChange);
}

export function deactivate() {}
