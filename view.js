const view = {
    elements: {
        get queueList() {
            return document.getElementById('queue-table').querySelector('tbody');
        },
        get joinForm() {
            return document.getElementById('join-form');
        },
        get joinInput() {
            return document.getElementById('pair-input');
        },
        get joinButton() {
            return document.getElementById('join-btn');
        },
        get leaveForm() {
            return document.getElementById('leave-form');
        },
        get leaveButton() {
            return document.getElementById('leave-btn');
        },
        get queuedAt() {
            return document.getElementById('queued-at');
        },
        get instructions() {
            return document.getElementById('instructions');
        },
        get adminIndicator() {
            return document.getElementById('admin-indicator-container');
        },
    },
    setQueueView(isInQueue) {
        if (isInQueue) {
            view.elements.joinForm.classList.add('hidden');
            view.elements.instructions.classList.add('hidden');

            view.elements.leaveForm.classList.remove('hidden');
            view.elements.queuedAt.classList.remove('hidden');
        } else {
            view.elements.joinInput.value = '';

            view.elements.leaveForm.classList.add('hidden');
            view.elements.queuedAt.classList.add('hidden');

            view.elements.joinForm.classList.remove('hidden');
            view.elements.instructions.classList.remove('hidden');
        }

        view.updateQueueList();
    },
    addToQueueList(pairItem) {
        const queue = `
            <tr id="${pairItem.id}">
            <td>${pairItem.name}</td>
            <td class="align-right"></td>
            </tr>
        `;

        view.elements.queueList.innerHTML += queue;

        view.updateQueueList();
    },
    removeFromQueueList(pairItem) {
        const row = view.elements.queueList.querySelector(`tr[id="${pairItem.id}"]`);

        if (user.pairKey === pairItem.id) {
            this.setQueueView(false);
        }

        if (row) {
            row.remove();
        }

        view.updateQueueList();
    },
    updateQueueList() {
        const rows = view.elements.queueList.querySelectorAll('tr');

        if (user.isCourtAdmin) {
            view.elements.adminIndicator.classList.remove('hidden');
        } else {
            view.elements.adminIndicator.classList.add('hidden');
        }

        rows.forEach((row, index) => {
            const pairId = row.id;
            const tds = row.querySelectorAll('td');
            const firstTd = tds[0];
            const secondTd = tds[1];
            const button = firstTd.querySelector('button');
            const playingIndicator = `<span class="playing-indicator">PLAYING</span>`;
            const nextIndicator = `<span>NEXT</span>`;

            if (index <= 2) {
                if (user.isCourtAdmin) {
                    if (!button) {
                        firstTd.innerHTML = `
                            <button type='button' class='delete-button'>
                                <i class="fa-solid fa-person-circle-minus delete-button"></i>
                            </button>
                        ` + firstTd.innerHTML;
                    }
                } else {
                    if (button) {
                        button.remove();
                    }
                }

                secondTd.innerHTML = playingIndicator;
            }

            if (index > 2 && button) {
                button.remove();
                secondTd.innerHTML = '';
            }

            if (index === 2) {
                secondTd.innerHTML = nextIndicator;
            }

            if (pairId === user.pairKey) {
                const userPlayer = document.getElementById(pairId)
                userPlayer.classList.add('user-indicator');
            }
        })
    },
};
