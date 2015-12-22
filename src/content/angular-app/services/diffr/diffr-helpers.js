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
            var diffLine = diffLines[i];

            if (diffLine.match === false)
            {
                html += "<div style='background:#fee'>";

                for (var j = 0; j < diffLine.matchMap.length; j++)
                {
                    if(diffLine.matchMap[j] === true)
                    {
                        html += diffLine.text[j];
                    }
                    else
                    {
                        html += "<span style='color:red'>" + (diffLine.text[j] || "") + "</span>";
                    }
                }

                html += "</div>";
            }
            else
            {
                html += diffLine.text;
            }
        }

        return html;
    };
});