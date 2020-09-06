const tokens = ['Number', 'WhiteSpace', 'LineTerminator', '+', '-', '*', '/']

const regexp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|([\+]+)|([\-]+)|([\*]+)|([\/]+)/g;

function* tokenize(input) {
    let lastIndex = regexp.lastIndex = 0;
    let result = null;
    while((result = regexp.exec(input))) {
        // console.log(result[0], regexp.lastIndex);
        if (regexp.lastIndex - lastIndex > result[0].length) {
            throw '匹配错误';
        }
        let token = {
            type: null,
            value: null,
        };
        for (let i = 1;i < result.length;i++) {
            if (result[i]) {
                token.type = tokens[i - 1];
                token.value = result[i];
            }
        }
        lastIndex = regexp.lastIndex;
        yield token;
    }
    yield {
        type: 'EOF',
    };
}

const source = [];

for (let token of tokenize('1 + 2 + 25')) {
    if (token.type !== 'WhiteSpace' && token.type !== 'LineTerminator') {
        source.push(token);
    }
    // console.log(token);
}


// AdditiveExpression = MultiplicativeExpression
// | MultiplicativeExpression <*> Number
// | MultiplicativeExpression </> Number
// | AdditiveExpression <+> MultiplicativeExpression
// | AdditiveExpression <-> MultiplicativeExpression;

// MultiplicativeExpression = Number
// | Number <*> MultiplicativeExpression
// | Number </> MultiplicativeExpression

function multiplicativeExpression(source) {
    if (source[0].type === 'Number') {
        let node = {
            type: 'MultiplicativeExpression',
            children: [source[0]],
        };
        source[0] = node;
        return multiplicativeExpression(source);
    }
    if (source[0].type === 'MultiplicativeExpression' && source[1] && source[1].type === '*') {
        let node = {
            type: 'MultiplicativeExpression',
            operator: '*',
            children: [],
        };
        node.children.push(source.shift());
        node.children.push(source.shift());
        node.children.push(source.shift());
        source.unshift(node);
        return multiplicativeExpression(source);
    }
    if (source[0].type === 'MultiplicativeExpression' && source[1] && source[1].type === '/') {
        let node = {
            type: 'MultiplicativeExpression',
            operator: '/',
            children: [],
        };
        node.children.push(source.shift());
        node.children.push(source.shift());
        node.children.push(source.shift());
        source.unshift(node);
        return multiplicativeExpression(source);
    }
    if (source[0].type === 'MultiplicativeExpression') {
        return source[0];
    }

    return multiplicativeExpression(source);
}

function additiveExpression(source) {
    if (source[0].type === 'MultiplicativeExpression') {
        let node = {
            type: 'AdditiveExpression',
            children: [source[0]],
        };
        source[0] = node;
        return additiveExpression(source);
    }
    if (source[0].type === 'AdditiveExpression' && source[1] && source[1].type === '+') {
        let node = {
            type: 'AdditiveExpression',
            operator: '+',
            children: [],
        };
        node.children.push(source.shift());
        node.children.push(source.shift());
        multiplicativeExpression(source);
        node.children.push(source.shift());
        source.unshift(node);
        return additiveExpression(source);
    }
    if (source[0].type === 'AdditiveExpression' && source[1] && source[1].type === '-') {
        let node = {
            type: 'AdditiveExpression',
            operator: '-',
            children: [],
        };
        node.children.push(source.shift());
        node.children.push(source.shift());
        multiplicativeExpression(source);
        node.children.push(source.shift());
        source.unshift(node);
        return additiveExpression(source);
    }

    if (source[0].type === 'AdditiveExpression') {
        return source[0];
    }

    multiplicativeExpression(source);

    return additiveExpression(source);
}

function expression(source) {
    if (source[0].type === 'AdditiveExpression' && source[1] && source[1].type === 'EOF') {
        let node = {
            type: 'Expression',
            children: [source.shift(), source.shift()],
        }
        return node;
    }
    additiveExpression(source);
    return expression(source);
}

// console.log(JSON.stringify(multiplicativeExpression(source)));

console.log(JSON.stringify(expression(source)));