export const commonPrefixLength = (a: string, b: string, caseSensitive = false): number => {
    if (!a || !b) {
        return 0;
    }

    let i = 0;
    while (a[i] && b[i] && (caseSensitive ? a[i] === b[i] : a[i].toLowerCase() === b[i].toLowerCase())) {
        i++;
    }
    return i;
};
