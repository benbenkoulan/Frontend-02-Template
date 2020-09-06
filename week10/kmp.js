// a b c d a b c e
// 0 0 0 0 0 1 2 3

// a b a b a b c
// 0 0 0 1 2 3 4

// a a b a a a c
// 0 0 1 

function kmp(source, pattern) {
    const table = Array(pattern.length).fill(0);

    {
        // 开始的位置、出现重复的次数
        let i = 1, j = 0;

        while (i < pattern.length) {
            if (pattern[i] !== pattern[j]) {
                if (j > 0) {
                    j = table[j];
                } else {
                    ++i;
                }
            } else {
                ++i, ++j;
                table[i] = j;
            }
        }
    }

    console.log(table);

    {
         // source的位置、pattern的位置
        let i = 0, j = 0;
        while (i < source.length) {
            if (j === pattern.length) {
                return true;
            }
            if (pattern[j] === source[i]) {
                ++i, ++j;
            } else {
                if (j > 0) {
                    j = table[j];
                } else {
                    ++i;
                }
            }
        }
        return false;
    }
}

console.log(kmp('abcdabcde', 'aabaaac'));