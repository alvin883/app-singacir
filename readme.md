#### Module Resolver

How to add new shortcut for module :

1. add to `.babelrc`
2. add to `.eslintrc.js`
3. add to `jsconfig.json`

### Reference :

-   **Text Props Type**

    > Ref: https://stackoverflow.com/a/52805401

-   **goBack and setParams (React Navigation)**
    > Ref: https://github.com/react-navigation/react-navigation/issues/288#issuecomment-315684617

### Common Issues :

-   **Expo fail to start**  
     Goto:

    > \node_modules\metro-config\src\defaults\blacklist.js

    ```javascript
    var sharedBlacklist = [
        /node_modules[/\\]react[/\\]dist[/\\].*/,
        /website\/node_modules\/.*/,
        /heapCapture\/bundle\.js/,
        /.*\/__tests__\/.*/,
    ];
    ```

    Change to:

    ```javascript
    var sharedBlacklist = [
        /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
        /website\/node_modules\/.*/,
        /heapCapture\/bundle\.js/,
        /.*\/__tests__\/.*/,
    ];
    ```

    Reference: https://github.com/expo/expo-cli/issues/1074#issuecomment-546167583

-   **SHA-1 Problem**  
     It's just some conflict between yarn and NPM package SHA, so intead of using NPM, just use `yarn start` directly

### Commit Message Rule

> Using semantic commit message

See how a minor change to your commit message style can make you a better programmer.

Format: `<type>(<scope>): <subject>`

`<scope>` is optional

##### Example

```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```

More Examples:

-   `feat`: (new feature for the user, not a new feature for build script)
-   `fix`: (bug fix for the user, not a fix to a build script)
-   `docs`: (changes to the documentation)
-   `style`: (formatting, missing semi colons, etc; no production code change)
-   `refactor`: (refactoring production code, eg. renaming a variable)
-   `test`: (adding missing tests, refactoring tests; no production code change)
-   `chore`: (updating grunt tasks etc; no production code change)

References:

-   https://www.conventionalcommits.org/
-   https://seesparkbox.com/foundry/semantic_commit_messages
-   http://karma-runner.github.io/1.0/dev/git-commit-msg.html
-   https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716

### Style Helper

```javascript
const style = {
    // TODO: Make this global for style helper
    // `absolute-center-middle` position
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    // -------------------------
};
```
