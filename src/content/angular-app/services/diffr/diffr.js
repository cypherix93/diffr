AngularApp.service("$diffr", function(diffrHelpers)
{
    var _this = this;

    _this.Diff = function(left, right)
    {
        var leftText = diffrHelpers.ProcessHtml(left);
        var rightText = diffrHelpers.ProcessHtml(right);

        return _this.Differentiate(leftText, rightText);
    };

    _this.Differentiate = function(leftText, rightText)
    {
        var leftLines = _this.GetDiffLines(leftText);
        var rightLines = _this.GetDiffLines(rightText);

        var maxLength = Math.max(leftLines.length, rightLines.length);

        for (var i = 0; i < maxLength; i++)
        {
            var leftLine = leftLines[i];
            var rightLine = rightLines[i];

            // Empty checks
            if (!leftLine)
            {
                leftLines[i] = {
                    text: "",
                    match: false
                };
                rightLine.match = false;
                continue;
            }
            if (!rightLine)
            {
                rightLines[i] = {
                    text: "",
                    match: false
                };
                leftLine.match = false;
                continue;
            }

            // Diff the text on each side
            _this.DiffLine(leftLine, rightLine);
        }

        return {
            Left: diffrHelpers.ParseDiffToHtml(leftLines),
            Right: diffrHelpers.ParseDiffToHtml(rightLines)
        }
    };

    _this.DiffLine = function(leftLine, rightLine)
    {
        if(leftLine.text !== rightLine.text)
        {
            leftLine.match = false;
            rightLine.match = false;
        }
    };

    _this.GetDiffLines = function(text)
    {
        var lines = text.toString().split("\n");
        var diffLines = [];

        for (var i = 0; i < lines.length; i++)
        {
            var line = lines[i];

            diffLines.push({
                text: line
            });
        }

        return diffLines;
    };
});