document.addEventListener('DOMContentLoaded', () => {
    const dateElements = document.querySelectorAll('[data-post-date]');
    dateElements.forEach(element => {
        const isoDate = element.getAttribute('data-post-date');
        const localDate = new Date(isoDate).toLocaleString();
        element.textContent = localDate;
    });
});