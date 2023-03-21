export function paginate(items, pageNumber, pageSize, setActivePage) {
    const a = [...items].splice((pageNumber - 1) * pageSize, pageSize);
    if (a.length) {
        return a;
    } else {
        setActivePage(pageNumber - 1);
        return a;
    }
}
