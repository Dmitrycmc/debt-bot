const commonPrefixLength = (a, b, caseSensitive = false) => {
    if (!a || !b) {
        return 0;
    }

    for (let i = a.length; i >= 0; i--) {
        if (caseSensitive ?
            b.startsWith(a.slice(0, i)) :
            b.toLowerCase().startsWith(a.slice(0, i).toLowerCase())
        ) {
            return i;
        }
    }
};

module.exports = {
    commonPrefixLength
};