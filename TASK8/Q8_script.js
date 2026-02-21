$(document).ready(function () {
    let booksJSON = [];

    // Loading XML using AJAX
    $.ajax({
        type: "GET",
        url: "books.xml",
        dataType: "xml",
        success: function (xml) {
            $(xml)
                .find("book")
                .each(function () {
                    let book = {
                        title: $(this).find("title").text(),
                        author: $(this).find("author").text(),
                        genre: $(this).find("genre").text(),
                        price: parseFloat($(this).find("price").text()),
                        publicationDate: $(this).find("publicationDate").text(),
                    };

                    booksJSON.push(book);
                });

            populateFilters();
            displayBooks(booksJSON);
        },
    });

    function populateFilters() {
        let genres = new Set();
        let authors = new Set();

        booksJSON.forEach((book) => {
            genres.add(book.genre);
            authors.add(book.author);
        });

        genres.forEach((g) => {
            $("#genreFilter").append(`<option value="${g}">${g}</option>`);
        });

        authors.forEach((a) => {
            $("#authorFilter").append(`<option value="${a}">${a}</option>`);
        });
    }

    function displayBooks(data) {
        $("#bookTable tbody").empty();

        data.forEach((book) => {
            $("#bookTable tbody").append(`
                <tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.genre}</td>
                    <td>${book.price}</td>
                    <td>${book.publicationDate}</td>
                </tr>
            `);
        });
    }

    $("#filterBtn").click(function () {
        let selectedGenre = $("#genreFilter").val();
        let selectedAuthor = $("#authorFilter").val();
        let minPrice = parseFloat($("#minPrice").val()) || 0;
        let maxPrice = parseFloat($("#maxPrice").val()) || Infinity;

        let filtered = booksJSON.filter((book) => {
            return (
                (selectedGenre === "All" || book.genre === selectedGenre) &&
                (selectedAuthor === "All" || book.author === selectedAuthor) &&
                book.price >= minPrice &&
                book.price <= maxPrice
            );
        });

        displayBooks(filtered);
    });
});
