# twospacefourspace
This is a four-space and two-space indentation interconverter.
This is a preview because I still need to use it a few times and see if there are some weird cases I need to account for.

## Features
* `Ctrl-Shift-P` or `F1` to open the command menu, then type either of the following:
* `Two to four (indentation)`
* `Four to two (indentation)`
* If there is no active selection, twospacefourspace will act on the entire file

## Keyboard Shortcuts
Example of addition to keyboard shortcuts config file (open using the `File` menu or by running the `Preferences: Open Keyboard Shortcuts` command):
```
{
    "key": "ctrl+shift+=",
    "command": "twospacefourspace.twoToFour",
    "when": "editorTextFocus"
},
{
    "key": "ctrl+shift+-",
    "command": "twospacefourspace.fourToTwo",
    "when": "editorTextFocus"
}
```

## Planned Features
* Throw warning dialog when indentation isn't two or four spaces and can't properly convert without 'losing' whitespace
* Deal with edge cases if/when I encounter them

## Release Notes
### 0.2.0
Now handles selection

### 0.0.1
Initial release
