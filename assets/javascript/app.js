$(document).ready(function() {

    var gifs = ["Dogs", "Cats", "Funny", "Batman", "Movie", "Pizza"];

    function renderButtons() {
        $("#gif-buttons").empty();
        for (var i = 0; i < gifs.length; i++) {
            var button = $("<button>");
            button.addClass("gif");
            button.attr("id", "button");
            button.attr("data-name", gifs[i]);
            button.text(gifs[i]);
            $("#gif-buttons").append(button);
        }
    };

    // Got gifs to display with rating when user adds button
    $("#add-gif").on("click", function(event) {
        event.preventDefault();
        var gif = $("#gif-input").val().trim();
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + 
            gif + "&api_key=mes26kKpAZzcFIosRqJ30SMi6AflvJQa&limit=5";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            console.log(response);
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height.url);
                gifDiv.append(p);
                gifDiv.append(gifImage);
                $("#display-gifs").prepend(gifDiv);
            }
        })
        gifs.push(gif);
        renderButtons();
        console.log(gifs);
    });
   
    // Unable to get gifs to display via class when clicking button
    $(".gif").on("click", function(event) {
        event.preventDefault();
        var thisGif = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + 
            thisGif + "&api_key=mes26kKpAZzcFIosRqJ30SMi6AflvJQa&limit=5";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            console.log(response);
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height.url);
                gifDiv.append(p);
                gifDiv.append(gifImage);
                $("#display-gifs").prepend(gifDiv);
            }
        })
    });

    renderButtons();

});