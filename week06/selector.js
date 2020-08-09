void function() { 
    let currentSelector = '';
    let currentAttributeName = '';
    let currentAttributeValue = '';

    const reg = /[^\[\]\s>+\.~*=]/;

    const getItem = () => ({
        ancestor: null,
        descendant: null,
        parent: null,
        child: null,
        _neighbor: null,
        neighbor: null,
        _brother: null,
        brother: null,
        selectors: [],
    });

    let current = getItem();

    let currentElement = null;

    function parseSelector(selector) {
        let state = startSimpleSelector;
        for (let char of `${selector}\r`) {
            // console.log(char);
            state = state(char);
        }
    }

    function startSimpleSelector(char) {
        if (char === '.') {
            return parseClassName;
        } else if (char === '#') {
            return parseId;
        } else if (reg.test(char)) {
            return parseTagName(char);
        } else if (char === '[') {
            return parseAttributeName;
        } else if (char === '*') {
            return parseUniversal(char);
        } else if (char === ' ') {
            return startSimpleSelector;
        } else  {
            return end;
        }
    }

    function parseClassName(char) {
        if (/[^\s>+\.~*]/.test(char)) {
            currentSelector += char;
            return parseClassName;
        } else if (char === '.') {
            current.selectors.push({
                type: 'class',
                value: currentSelector,
            });
            currentSelector = '';
            return parseAndClassName;
        } else if (char === ' ') {
            current.selectors.push({
                type: 'class',
                value: currentSelector,
            });
            const descendant = getItem();
            current.descendant = descendant;
            descendant.ancestor = current;
            current = descendant;
            currentSelector = '';
            return startSimpleSelector;
        } else if (char === '>') {
            current.selectors.push({
                type: 'class',
                value: currentSelector,
            });
            const child = getItem();
            current.child = child;
            child.parent = current;
            current = child;
            currentSelector = '';
            return startSimpleSelector;
        } else if (char === '+') {
            current.selectors.push({
                type: 'class',
                value: currentSelector,
            });
            const neighbor = getItem();
            current.neighbor = neighbor;
            neighbor._neighbor = current;
            current = neighbor;
            currentSelector = '';
            return startSimpleSelector;
        } else if (char === '~') {
            current.selectors.push({
                type: 'class',
                value: currentSelector,
            });
            const brother = getItem();
            current.brother = brother;
            brother._brother = current;
            current = brother;
            currentSelector = '';
            return startSimpleSelector;
        } else {
            current.selectors.push({
                type: 'class',
                value: currentSelector,
            });
            return end;
        }
    }

    function parseAndClassName(char) {
        if (reg.test(char)) {
            currentSelector += char;
            return parseAndClassName;
        } else if (char === '.') {
            current.selectors.push({
                type: 'class',
                value: currentSelector,
            });
            currentSelector = '';
            return parseAndClassName;
        } else if (char === ' ') {
            current.selectors.push({
                type: 'class',
                value: currentSelector,
            });
            const descendant = getItem();
            current.descendant = descendant;
            descendant.ancestor = current;
            current = descendant;
            currentSelector = '';
            return startSimpleSelector;
        } else if (char === '>') {
            current.selectors.push({
                type: 'class',
                value: currentSelector,
            });
            const child = getItem();
            current.child = child;
            child.parent = current;
            current = child;
            currentSelector = '';
            return startSimpleSelector;
        } else if (char === '+') {
            current.selectors.push({
                type: 'class',
                value: currentSelector,
            });
            const neighbor = getItem();
            current.neighbor = neighbor;
            neighbor._neighbor = current;
            current = neighbor;
            currentSelector = '';
            return startSimpleSelector;

        } else if (char === '~') {
            current.selectors.push({
                type: 'class',
                value: currentSelector,
            });
            const brother = getItem();
            current.brother = brother;
            brother._brother = current;
            current = brother;
            currentSelector = '';
            return startSimpleSelector;
        } else {      
            current.selectors.push({
                type: 'class',
                value: currentSelector,
            });
            return end;
        }
    }

    function parseTagName(char) {
        if (reg.test(char)) {
            currentSelector += char;
            return parseTagName;
        } else if(char === '.') {
            current.selectors.push({
                type: 'tagName',
                value: currentSelector,
            });
            currentSelector = '';
            return parseAndClassName;
        } else if (char === ' ') {
            current.selectors.push({
                type: 'tagName',
                value: currentSelector,
            });
            const descendant = getItem();
            current.descendant = descendant;
            descendant.ancestor = current;
            current = descendant;
            currentSelector = '';
            return startSimpleSelector;
        } else if (char === '+') {
            current.selectors.push({
                type: 'tagName',
                value: currentSelector,
            });
            const neighbor = getItem();
            current.neighbor = neighbor;
            neighbor._neighbor = current;
            current = neighbor;
            currentSelector = '';
            return startSimpleSelector;
        } else if (char === '~') {
            current.selectors.push({
                type: 'tagName',
                value: currentSelector,
            });
            const brother = getItem();
            current.brother = brother;
            brother._brother = current;
            current = brother;
            currentSelector = '';
            return startSimpleSelector;
        } else if (char === '>') {
            current.selectors.push({
                type: 'tagName',
                value: currentSelector,
            });
            const child = getItem();
            current.child = child;
            child.parent = current;
            current = child;
            currentSelector = '';
            return startSimpleSelector;
        } else {
            current.selectors.push({
                type: 'tagName',
                value: currentSelector,
            });
            return end;
        }
    }

    function parseId(char) {
        if (reg.test(char)) {
            currentSelector += char;
            return parseId;
        } else if(char === '.') {
            current.selectors.push({
                type: 'id',
                value: currentSelector,
            });
            currentSelector = '';
            return parseAndClassName;
        } else if (char === ' ') {
            current.selectors.push({
                type: 'id',
                value: currentSelector,
            });
            const descendant = getItem();
            current.descendant = descendant;
            descendant.ancestor = current;
            current = descendant;
            currentSelector = '';
            return startSimpleSelector;
        } else if (char === '+') {
            current.selectors.push({
                type: 'id',
                value: currentSelector,
            });
            const neighbor = getItem();
            current.neighbor = neighbor;
            neighbor._neighbor = current;
            current = neighbor;
            currentSelector = '';
            return startSimpleSelector;
        } else if (char === '~') {
            current.selectors.push({
                type: 'id',
                value: currentSelector,
            });
            const brother = getItem();
            current.brother = brother;
            brother._brother = current;
            current = brother;
            currentSelector = '';
            return startSimpleSelector;
        } else if (char === '>') {
            current.selectors.push({
                type: 'id',
                value: currentSelector,
            });
            const child = getItem();
            current.child = child;
            child.parent = current;
            current = child;
            currentSelector = '';
            return startSimpleSelector;
        } else {
            current.selectors.push({
                type: 'id',
                value: currentSelector,
            });
            return end;
        }
    }

    function parseAttributeName(char) {
        if (reg.test(char)) {
            currentAttributeName += char;
            return parseAttributeName;
        } else if (char === '=') {
            return parseAttributeValue;
        } else {
            return end;
        } 
    }

    function parseAttributeValue(char) {
        if (reg.test(char)) {
            currentAttributeValue += char;
            return parseAttributeValue;   
        } else if (char === ']') {
            current.selectors.push({
                type: 'attribute',
                name: currentAttributeName,
                value: currentAttributeValue,
            });
            currentAttributeName = '';
            currentAttributeValue = '';
            return parseAttributeValue;
        } else if (char === '.') {
            return parseClassName;
        } else if (char === ' ') {
            const descendant = getItem();
            current.descendant = descendant;
            descendant.ancestor = current;
            current = descendant;
            return startSimpleSelector;
        } else if (char === '>') {
            const child = getItem();
            current.child = child;
            child.parent = current;
            current = child;
            return startSimpleSelector;
        } else if (char === '+') {
            const neighbor = getItem();
            current.neighbor = neighbor;
            current._neighbor = current;
            current = neighbor;
            return startSimpleSelector;
        } else if (char === '~') {
            const brother = getItem();
            current.brother = brother;
            brother._brother = current;
            current = brother;
            return startSimpleSelector;
        } else {
            return end;
        }
    }

    function parseUniversal(char) {
        if (char === '*') {
            current.selectors.push({
                type: 'universal',
            });
            return parseUniversal;
        } else if (char === '.') {
            return parseAndClassName;
        } else if (char === '#') {
            return parseId;
        } else if (char === ' ') {
            const descendant = getItem();
            current.descendant = descendant;
            descendant.ancestor = current;
            current = descendant;
            return startSimpleSelector;
        } else if (char === '>') {
            const child = getItem();
            current.child = child;
            child.parent = current;
            current = child;
            return startSimpleSelector;
        } else if (char === '+') {
            const neighbor = getItem();
            current.neighbor = neighbor;
            neighbor._neighbor = current;
            current = neighbor;
            return startSimpleSelector;
        } else if (char === '~') {
            const brother = getItem();
            current.brother = brother;
            brother._brother = current;
            current = brother;
            return startSimpleSelector;
        } else {
            return end;
        }
    }

    function end() {
        return end;
    }

    function matchSelector(selector, element) {
        if (selector.type === 'tagName') {
            return element.tagName.toLowerCase() === selector.value;        
        } else if (selector.type === 'class') {
            return !!Array.from(element.classList).find(clz => clz === selector.value);
        } else if (selector.type === 'id') {
            return element.id === selector.value;
        } else if (selector.type === 'attribute') {
            return element.getAttribute(selector.name) === selector.value;
        } else if (selector.type === 'universal') {
            return true;
        } else {
            return true;
        }
    }

    function matchSelectors(selectors, element) {
        const matched = selectors.every(selector => matchSelector(selector, element));
        if (matched) {
            currentElement = element;
        }
        return matched;
    }

    function matchAncestor(selectors, element) {
        if (!element.parentNode || element.parentNode === document) return false;
        if (matchSelectors(selectors, element.parentNode)) return true;
        return matchAncestor(selectors, element.parentNode);
    }

    function matchNeighbor(selectors, element) {
        if (!element.previousElementSibling) return false;
        return matchSelectors(selectors, element.previousElementSibling);
    }

    function matchBrother(selectors, element) {
        if (!element.previousElementSibling) return false;
        if (matchSelectors(selectors, element.previousElementSibling)) return true;
        return matchBrother(selectors, element.previousElementSibling);
    }

    function matchParent(selectors, element) {
        if (!element.parentNode) return false;
        return matchSelectors(selectors, element.parentNode);
    }

    function match(selector, element) {
        parseSelector(selector);
        let bottom = current;
        let currentElement = element;
        let matched = matchSelectors(bottom.selectors, currentElement);
        console.log('----matched---', matched);
        while (bottom && matched) {
            if (bottom.ancestor) {
                bottom = bottom.ancestor;
                matched = matchAncestor(bottom.selectors, currentElement);
            } else if (bottom.parent) {
                bottom = bottom.parent;
                matched = matchParent(bottom.selectors, currentElement);
            } else if (bottom._neighbor) {
                bottom = bottom._neighbor;
                matched = matchNeighbor(bottom.selectors, currentElement);
            } else if (bottom._brother) {
                bottom = bottom._brother;
                matched = matchBrother(bottom.selectors, currentElement);
            } else {
                bottom = null;
            }
        }
        return matched;
    }

    console.log(match('div .div2 #test+.test', document.querySelector('.test')));
    console.log(match('.div .div2', document.querySelector('.div2')));
}();