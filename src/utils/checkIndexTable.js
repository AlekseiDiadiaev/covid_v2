const checkIndexTable = (num, shownData) => { 
    if (num < 0) return 0;
    if (num > shownData.length) return shownData.length;
    return num;
}

export default checkIndexTable;