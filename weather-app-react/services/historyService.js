async function deleteHistory(id) {
    const response = await fetch(`/history/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Something wrong')
    };
}

async function getHistory() {
    const response = await fetch('/history');

    if (!response.ok) {
        throw new Error('Cannot fetch history, something wrong')
    };

    return await response.json();
}

export { deleteHistory, getHistory };