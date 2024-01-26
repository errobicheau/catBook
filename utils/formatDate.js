function formatDate(originalDateString) {
    const parsedDate = new Date(originalDateString);

    const formattedDate = parsedDate.toLocaleString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });

    return formattedDate;
}

module.exports = formatDate;
