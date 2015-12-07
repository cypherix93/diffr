AngularApp.service("diffrHelpers", function ()
{
    var _this = this;

    _this.ProcessHtml = function (htmlText)
    {
        var html = $("<div>" + htmlText + "</div>");
        html.find("br").replaceWith("\n");

        return html.text();
    };

    _this.ParseDiffToHtml = function (diffLines)
    {
        var html = "";

        for (var i = 0; i < diffLines.length; i++)
        {
            var diffLine = diffLines[i];

            console.log(diffLine);

            if (diffLine.match === false)
            {
                html += "<span style='color:red'>" + diffLine.text + "</span>";
            }
            else
            {
                html += diffLine.text;
            }

            html += "<br>";
        }

        return html;
    };
});