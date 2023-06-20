let apiKey = "10157e4774e1ef6997d2202dc2d930a0";
let searchKey = "";
$(document).ready(function() {
    $("#submit").click(function() {
        let location = $("#location").val();
        if(!isNaN(location)) {
            searchKey = "zip";
        } else {
            searchKey = "q";
        }
        if(location != "") {
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/weather?" +
                    searchKey + '=' + location +'&units=metric&appid=' + apiKey,
                type: "GET",
                dataType: "jsonp",
                success: function(data) {
                    let widget = result(data);
                    $("#result").html(widget);
                    $("#result").show("");
                },
                error: function() {
                    $("#result").html("<h2>City not found</h2>");
                    $("#result").show();
                }
            });
        }
    });
});
function result(data) {
    return "<div><h2>Current Weather for " + data.name + "</h2>" +
        "<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' width=100px>" +
        "<h4> Weather: " + data.weather[0].main + "<br>" +
        "Temperature: " + data.main.temp + "C <br>" +
        "Description: " + data.weather[0].description + "<br> " +
        "High Temperature: " + data.main.temp_max + "C <br> "+
        "Low Temperature: " + data.main.temp_min + "C <br> "+
        "Pressure: " + data.main.pressure + "hPa <br>" +
        "Humidity: " + data.main.humidity + "%<br>" +
        "Visibility: " + data.visibility + "meters <br>" +
        "Wind Speed: " + data.wind.speed + " m/sec <br>" +
        "Wind Direction: " + data.wind.deg + " degrees </h4></div>";
}