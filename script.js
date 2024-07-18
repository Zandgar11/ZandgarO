document.getElementById('run').addEventListener('click', () => {
    const code = document.getElementById('code').value;
    const tokens = lexer(code);
    const [commands, debugMode] = parser(tokens);
    const interpreter = new Interpreter(debugMode);
    interpreter.run(commands);
});
