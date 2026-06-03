// Minimal vscode mock for tests running outside VS Code
module.exports = {
    commands: {
        executeCommand: async (..._args: any[]) => undefined,
        registerCommand: (_cmd: string, _cb: Function) => ({ dispose: () => {} }),
    },
    window: {
        showInformationMessage: async (..._args: any[]) => undefined,
        showErrorMessage: async (..._args: any[]) => undefined,
        showWarningMessage: async (..._args: any[]) => undefined,
        createStatusBarItem: () => ({
            text: '', tooltip: '', command: '', show: () => {}, hide: () => {}, dispose: () => {}
        }),
        createOutputChannel: (_name: string) => ({
            appendLine: () => {}, append: () => {}, show: () => {}, dispose: () => {},
        }),
    },
    workspace: {
        getConfiguration: () => ({
            get: (_key: string, defaultVal?: any) => defaultVal,
            update: async () => {},
        }),
        workspaceFolders: [],
    },
    StatusBarAlignment: { Left: 1, Right: 2 },
    Uri: {
        parse: (s: string) => ({ toString: () => s }),
        file: (s: string) => ({ fsPath: s, toString: () => s }),
    },
    EventEmitter: class { event = () => {}; fire() {} dispose() {} },
    Disposable: { from: () => ({ dispose: () => {} }) },
    ExtensionMode: { Production: 1, Development: 2, Test: 3 },
};
