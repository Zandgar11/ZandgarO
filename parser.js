function parser(tokens) {
    const commands = [];
    let debugMode = false;
    let i = 0;

    while (i < tokens.length) {
        if (tokens[i][0] === 'DEBUG') {
            debugMode = true;
            i++;
        } else if (tokens[i][0] === 'OPEN_CONSOLE') {
            commands.push(['OPEN_CONSOLE']);
            i++;
        } else if (tokens[i][0] === 'PRINT') {
            if (tokens[i+1][0] === 'WORD') {
                commands.push(['PRINT', tokens[i+1][1]]);
                i += 2;
            } else {
                throw new Error('Expected word after -p');
            }
        } else if (tokens[i][0] === 'SET_VAR') {
            if (tokens[i+1][0] === 'WORD') {
                const varName = tokens[i+1][1];
                i += 2;
                const varContent = [];
                while (i < tokens.length && !['OPEN_CONSOLE', 'PRINT', 'SET_VAR', 'ADD', 'CLOSE_CONSOLE', 'DEBUG'].includes(tokens[i][0])) {
                    varContent.push(tokens[i][1]);
                    i++;
                }
                commands.push(['SET_VAR', varName, varContent.join(' ')]);
            } else {
                throw new Error('Expected a variable name after -s');
            }
        } else if (tokens[i][0] === 'ADD') {
            if (tokens[i+1][0] === 'WORD' && tokens[i+2][0] === 'WORD' && tokens[i+3][0] === 'WORD') {
                commands.push(['ADD', tokens[i+1][1], tokens[i+2][1], tokens[i+3][1]]);
                i += 4;
            } else {
                throw new Error('Expected three words after -a');
            }
        } else if (tokens[i][0] === 'CLOSE_CONSOLE') {
            commands.push(['CLOSE_CONSOLE']);
            i++;
        } else {
            i++;
        }
    }
    return [commands, debugMode];
        }
