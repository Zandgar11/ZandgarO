function lexer(code) {
    const tokens = [];
    const tokenSpec = [
        ['DEBUG', /-d/],
        ['OPEN_CONSOLE', /-b/],
        ['PRINT', /-p/],
        ['SET_VAR', /-s/],
        ['ADD', /-a/],
        ['CLOSE_CONSOLE', /-e/],
        ['WORD', /\w+/],
        ['SKIP', /[ \t\n]+/],
        ['MISMATCH', /./]
    ];

    let match;
    while (code) {
        for (const [type, regex] of tokenSpec) {
            if (match = code.match(regex)) {
                if (type !== 'SKIP') {
                    tokens.push([type, match[0]]);
                }
                code = code.slice(match[0].length);
                break;
            }
        }
    }
    return tokens;
}
