document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("article table").forEach(function (table) {
        new Tablesort(table);
    });
});
