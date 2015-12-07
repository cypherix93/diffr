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
        if (diffLines.length === 0)
            return "";

        var html = "";

        for (var i = 0; i < diffLines.length; i++)
        {
            if (i > 0)
                html += "<br>";

            var diffLine = diffLines[i];

            if (diffLine.match === false)
            {
                html += "<span style='color:red'>" + diffLine.text + "</span>";
            }
            else
            {
                html += diffLine.text;
            }
        }

        return html;
    };
});