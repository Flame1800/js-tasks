const changeLang = (char) => {
    var layout = {
        "q": "й", "w": "ц", "e": "у", "r": "к", "t": "е", "y": "н", "u": "г", "i": "ш", "o": "щ", "p": "з",
        "[": "х", "]": "ъ", "a": "ф", "s": "ы", "d": "в", "f": "а", "g": "п", "h": "р", "j": "о", "k": "л",
        "l": "д", ";": "ж", "'": "э", "z": "я", "x": "ч", "c": "с", "v": "м", "b": "и", "n": "т", "m": "ь",
        ",": "б", ".": "ю", "/": "."
    };

    return layout[char] || char;
}

function normalizeText(text, changeLang) {
    const textChunks = text.split('[_]');
    let resultText = '';
    let isChangeLang = false;
    let isPasteText = false;

    const commandHandler = (command) => {
        if (command === 'b') {
            resultText = resultText.substring(0, resultText.length - 1);
        }
        if (command === 'l') {
            isChangeLang = !isChangeLang;
        }
        if (command === 'v') {
            isPasteText = true;
        }
    };

    for (let i = 0; i < textChunks.length; i++) {
        const chunk = textChunks[i];
        if (chunk === '') {
            continue;
        }
        if (chunk[0] === '[' && chunk[2] === ']') {
            commandHandler(chunk[1]);
            if (isPasteText) {
                const pastedText = chunk.replace(/\[v\]/g, "")
                const cleanedText = pastedText.replace(/(.+?)\1+/g, "$1");

                resultText += cleanedText;
                isPasteText = false;
            }
            continue;
        }
        if (isChangeLang) {
            const changedChar = changeLang(chunk[0]);
            resultText += changedChar;
            continue;
        }
   
        resultText += chunk[0];
    }

    return resultText
}

normalizeText('Y[_]aa[_]nnnn[_]d[_]e[_]xxx[_]![_][b][b][b]', changeLang)

normalizeText(`H[_]e[_]l[_]ll[_]o[_]
[_][l][l][_]v[_]bb[_]h`, changeLang)

normalizeText(`T[_]o[_]d[_]o[_]:[_]
[_][v][v]погладь котапогладь кота`, changeLang)
