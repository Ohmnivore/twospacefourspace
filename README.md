# twospacefourspace
Converts current working document between two-space indentation and four-space indentation.
This is a preview because I still need to use it a few times and see if there are some weird cases I need to account for.

## Features
* `Ctrl-Shift-P` or `F1` to open the command menu, then type either of the following:
* `Two to four (indentation)`
* `Four to two (indentation)`

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
* If there is a selection(s), act on it instead of the entire file
* Throw warning dialog when indentation isn't two or four spaces and can't properly convert
* Deal with edge cases if/when I encounter them

## Release Notes
### 0.0.1
Initial release
