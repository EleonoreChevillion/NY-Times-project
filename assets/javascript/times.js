$(document).ready(function() {
  $(document).on("click", "#search", searchResult);

  function reset() {
    $("#article-div").empty;
  }

  function searchResult() {
    event.preventDefault();
    //$("#article-div").empty;
    var search = $("#search-text").val();
    var queryURL =
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
      search +
      "&api-key=4pGrPZuacORWCsNMIlizLiGqgm3JkWqY";
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(data) {
      var results = data.response.docs;
      $("#article-div").empty();
      for (var i = 0; i < 7; i++) {
        var mainDiv = $("<div>");
        mainDiv.addClass("col-md-4");
        var a = $("<h4>");
        a.addClass("title");
        a.addClass("card-title");
        a.attr("data-name", results[i].headline.print_headline);
        a.text(results[i].headline.print_headline);
        $(mainDiv).append(a);
        var articleImg = $("<img>");
        articleImg.attr(
          "src",
          "https://static01.nyt.com/" + results[i].multimedia[0].url
        );
        articleImg.attr("class", "card-img-top");
        $(mainDiv).append(articleImg);
        var b = $("<div>");
        b.addClass("card-text");
        b.attr("data-name", results[i].snippet);
        b.text(results[i].snippet);
        $(mainDiv).append(b);

        var c = $("<button>");
        c.addClass("btn btn-outline-info");
        c.addClass("moreInfo");
        c.text("Learn more");
        $(mainDiv).append(c);
        $(".moreInfo").on("click", function() {
          window.location = results[i].web_url;
        });
        $("#article-div").append(mainDiv);
      }
    });
  }
});
