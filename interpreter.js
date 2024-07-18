class Interpreter {
    constructor(debugMode = false) {
        this.consoleOpen = false;
        this.variables = {};
        this.debugMode = debugMode;
    }

    run(commands) {
        const outputElement = document.getElementById('output');
        outputElement.textContent = '';

        for (const command of commands) {
            if (this.debugMode) {
                outputElement.textContent += `Executing command: ${command}\n`;
            }
            if (command[0] === 'OPEN_CONSOLE') {
                if (!this.consoleOpen) {
                    this.consoleOpen = true;
                }
            } else if (command[0] === 'PRINT') {
                if (this.consoleOpen) {
                    const value = command[1];
                    outputElement.textContent += (this.variables[value] || value) + '\n';
                } else {
                    throw new Error('Console not open');
                }
            } else if (command[0] === 'SET_VAR') {
                if (this.consoleOpen) {
                    const [_, varName, varValue] = command;
                    this.variables[varName] = varValue;
                } else {
                    throw new Error('Console not open');
                }
            } else if (command[0] === 'ADD') {
                if (this.consoleOpen) {
                    const [_, varName, var1, var2] = command;
                    if (var1 in this.variables && var2 in this.variables) {
                        const result = parseInt(this.variables[var1]) + parseInt(this.variables[var2]);
                        this.variables[varName] = result.toString();
                    } else {
                        throw new Error(`Variables ${var1} or ${var2} not defined`);
                    }
                } else {
                    throw new Error('Console not open');
                }
            } else if (command[0] === 'CLOSE_CONSOLE') {
                if (this.consoleOpen) {
                    this.consoleOpen = false;
                    break;
                } else {
                    throw new Error('Console not open');
                }
            }
        }
    }
}
