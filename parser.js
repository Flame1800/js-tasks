async function* parser(fetcher, src, chunkSize) {
    const markup = await fetcher(src);
    const chunks = []
    let currentChunk = []

    const markupIterartor = async (markup) => {
        for await (const item of markup) {
            if (currentChunk.length === chunkSize) {
                chunks.push(currentChunk)
                currentChunk = []
            }
    
            if (item.type === 'data') {
                currentChunk.push(item.value);
            }
            if (item.type === 'provider') {
                const newMarkup = await fetcher(item.src) 
                await markupIterartor(newMarkup);
            }
            if (item.children) {
                await markupIterartor(item.children)
            }
        }
    }
    await markupIterartor(markup)
    chunks.push(currentChunk)

    for (const chunk of chunks) {
        yield chunk;
    }
};



const src2 = [
    {
        type: 'data',
        value: 1
    },
    {
        type: 'data',
        value: 2
    },
    {
        type: 'data',
        value: 3
    },
    {
        type: 'data',
        value: 4
    }
]

const src1 = [
    {
        type: 'data',
        value: 1
    },
    {
        type: 'data',
        value: 2,
        children: [
            {
                type: 'data',
                value: 1
            },
            {
                type: 'provider',
                src: 'src2'
            },
        ]
    },
    {
        type: 'data',
        value: 3
    }
];
const data = { src1, src2 }
const chunkSize = 3;
const fetcher = async (url) => {
    return data[url]
}

(async () => {
    const asyncIterable = await parser(fetcher, 'src1', chunkSize);
    for await (const chunk of asyncIterable) {
        console.log(chunk);
    }
})()
