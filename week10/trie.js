let $ = Symbol('$');

class Trie {
    constructor() {
        this.root = Object.create(null);
    }

    insert(input) {
        let root = this.root;
        for (let char of input) {
            if (!root[char]) {
                root[char] = Object.create(null);
            }
            root = root[char];
        }
        if (!root[$]) root[$] = 0;
        root[$]++;
    }

    most() {
        let max = 0;
        let maxWord = null;
        const visit = (node, word) => {
            if (node[$] && node[$] > max) {
                max = node[$];
                maxWord = word;
            }

            for (let p in node) {
                visit(node[p], word + p);
            }
        };

        visit(this.root, '');

        return {
            max,
            maxWord,
        };
    }
}

const t = new Trie();
t.insert('1233');
t.insert('1233');
t.insert('1234');
t.insert('4343');

console.log(t.most());

