$(document).ready(function () {
    // Add game data
    $('#addGameButton').click(function () {
        const gameData = {
            title: $('#gameTitle').val(),
            year: $('#releaseYear').val(),
            rating: $('#gameRating').val(),
            graphicsRating: $('#graphicsRating').val(),
            multiplayer: $('#multiplayer').val(),
            funRating: $('#funRating').val(),
            recommendation: $('#recommendation').val(),
            review: $('#review').val()
        };

        console.log("Adding game:", gameData);

        $.ajax({
            url: '/games',
            type: 'POST',
            data: JSON.stringify(gameData),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                console.log("Game added successfully:", response);
                alert('Game added successfully!');
                // Clear form fields
                $('#gameTitle').val('');
                $('#releaseYear').val('');
                $('#gameRating').val('');
                $('#graphicsRating').val('');
                $('#multiplayer').val('yes'); // Reset to default value
                $('#funRating').val('');
                $('#recommendation').val('');
                $('#review').val('');
            },
            error: function (xhr, status, error) {
                console.error("Failed to add game:", xhr, status, error);
                alert('Failed to add game. Please try again.');
            }
        });
    });

    // List games
    $('#listGamesButton').click(function () {
        $.ajax({
            url: '/games',
            type: 'GET',
            success: function (data) {
                console.log("Fetched games:", data);
                const gamesList = $('#gamesList');
                gamesList.empty();
                data.forEach(game => {
                    gamesList.append(`
                        <li data-game-id="${game.id}">
                            ${game.title} - ${game.year}
                        </li>
                    `);
                });
            },
            error: function (xhr, status, error) {
                console.error("Failed to fetch games:", xhr, status, error);
                alert('Failed to fetch games. Please try again.');
            }
        });
    });

    // Randomize game
    $('#randomizeGameButton').click(function () {
        $.ajax({
            url: '/games/random',
            type: 'GET',
            success: function (data) {
                console.log("Random game fetched:", data);
                $('#randomGameTitle').text(`Random Game: ${data.title}`);
            },
            error: function (xhr, status, error) {
                console.error("Failed to fetch random game:", xhr, status, error);
                alert('Failed to fetch random game. Please try again.');
            }
        });
    });

    // Handle click on game list item
    $('#gamesList').on('click', 'li', function () {
        const gameId = $(this).data('game-id');
        $.ajax({
            url: `/games/${gameId}`,
            type: 'GET',
            success: function (game) {
                console.log("Fetched game details:", game);
                const gameDetailsContent = $('#gameDetailsContent');
                gameDetailsContent.empty();
                gameDetailsContent.append(`
                    <h3>${game.title}</h3>
                    <p><strong>Year Released:</strong> ${game.year}</p>
                    <p><strong>Game Rating:</strong> ${game.rating}</p>
                    <p><strong>Graphics Rating:</strong> ${game.graphicsRating}</p>
                    <p><strong>Multiplayer:</strong> ${game.multiplayer}</p>
                    <p><strong>Fun with Friends Rating:</strong> ${game.funRating}</p>
                    <p><strong>Recommendation:</strong> ${game.recommendation}</p>
                    <p><strong>Review/Comments:</strong> ${game.review}</p>
                `);
                $.mobile.changePage('#game-details');
            },
            error: function (xhr, status, error) {
                console.error("Failed to fetch game details:", xhr, status, error);
                alert('Failed to fetch game details. Please try again.');
            }
        });
    });
});
