$(document).ready(function() {
  $(document).on("click", "#search", reset(), searchResult());

  function reset() {
    $("#article-div").empty;
  }

  function searchResult() {
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
        var a = $("<div>");
        a.addClass("title col-md-4");
        a.attr("data-name", results[i].headline.print_headline);
        a.text(results[i].headline.print_headline);
        $("#article-div").append(a);

        var articleImg = $("<img>");
        articleImg.attr(
          "src",
          "https://static01.nyt.com/" + results[i].multimedia[0].url
        );
        articleImg.attr("class", "card-img-top");
        $("#article-div").append(articleImg);
        var b = $("<div>");
        b.attr("data-name", results[i].snippet);
        b.text(results[i].snippet);
        $("#article-div").append(b);
      }
    });
  }
});
