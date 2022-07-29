function pairIsCourtAdmin(id) {
    if (!id) {
        return false;
    }

    const matchingPairIndex = state.pairs.findIndex((pair) => pair.id === id);

    return matchingPairIndex > -1 && matchingPairIndex <= 2;
}

const user = {
    setPairKey: (id) => (
        id === undefined || id === null
            ? localStorage.removeItem('pairId')
            : localStorage.setItem('pairId', id)
    ),
    get pairKey() {
        return localStorage.getItem('pairId');
    },
    get isCourtAdmin() {
        return pairIsCourtAdmin(this.pairKey);
    },
};
