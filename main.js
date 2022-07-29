const state = {
    pairs: [],
};

function handleQueueChildAdded(snapshot) {
    const pairItem = {
        id: snapshot.key,
        name: snapshot.val().pair,
        pin: snapshot.val().pin,
    }

    state.pairs.push(pairItem);

    view.addToQueueList(pairItem);
}

function handleQueueChildRemoved(snapshot) {
    const pairId = snapshot.key;
    const targetIndex = state.pairs.findIndex((element) => element.id === pairId);
    const pairItem = state.pairs[targetIndex];

    if (user.pairKey === pairId) {
        user.setPairKey(null);
        view.setQueueView(false);
        db.getPinRef(state.pairs[targetIndex].pin).remove();
    }

    if (targetIndex !== -1) {
        state.pairs.splice(targetIndex, 1);
    }

    view.removeFromQueueList(pairItem);
}

function generatePin() {
    return Math.floor(1000 + Math.random() * 9000);
}

function handleJoinClick(event) {
    event.preventDefault();

    const queueText = view.elements.joinInput.value.trim();
    const pin = generatePin();

    if (!queueText.trim()) {
        alert('Please enter name + partner');
        return;
    }

    const snapshot = db.queueRef.push({ pair: queueText, pin: pin });
    user.setPairKey(snapshot.key);
    view.setQueueView(true);

    const targetIndex = state.pairs.findIndex((element) => element.id === snapshot.key);

    setTimeout(() => {
        alert(`Your pin is: ${state.pairs[targetIndex].pin}`);
    }, 5);
}

function handleLeaveClick() {
    if (window.confirm('Are you sure you want to leave the queue?')) {
        db.getPairRef(user.pairKey).remove();
        db.getPinRef(user.pairKey).remove();
    }
}

function handleDeleteClick(event) {
    const tableRow = event.target.closest('tr');
    const queueItemId = tableRow.id;

    if (user.isCourtAdmin) {
        if (pairIsCourtAdmin(queueItemId)) {
            if (window.confirm('Are you sure you want to delete this pair from the queue?')) {
                db.getPairRef(queueItemId).remove();
            }
        }
    }
}

function initialize() {
    db.queueRef.on('child_added', handleQueueChildAdded);
    db.queueRef.on('child_removed', handleQueueChildRemoved);

    view.elements.joinButton.addEventListener('click', handleJoinClick);
    view.elements.leaveButton.addEventListener('click', handleLeaveClick);
    view.elements.queueList.addEventListener('click', handleDeleteClick);

    if (user.pairKey) {
        view.setQueueView(true);
    }
}

initialize();