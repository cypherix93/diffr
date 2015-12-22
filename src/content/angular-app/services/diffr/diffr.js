AngularApp.service("$diffr", function (diffrHelpers)
{
    var _this = this;

    _this.Diff = function (left, right)
    {
        var leftText = diffrHelpers.ProcessHtml(left);
        var rightText = diffrHelpers.ProcessHtml(right);

        return _this.Differentiate(leftText, rightText);
    };

    _this.Differentiate = function (leftText, rightText)
    {
        var leftLines = _this.GetDiffLines(leftText);
        var rightLines = _this.GetDiffLines(rightText);

        var maxLength = Math.max(leftLines.length, rightLines.length);

        if (maxLength === 0)
            return {
                Left: "",
                Right: ""
            };

        for (var i = 0; i < maxLength; i++)
        {
            leftLines[i] = leftLines[i] || { text: "" };
            rightLines[i] = rightLines[i] || { text: "" };

            var leftLine = leftLines[i];
            var rightLine = rightLines[i];

            // Diff the text on each side
            _this.DiffLine(leftLine, rightLine);
        }

        return {
            Left: diffrHelpers.ParseDiffToHtml(leftLines),
            Right: diffrHelpers.ParseDiffToHtml(rightLines)
        }
    };

    _this.DiffLine = function (leftLine, rightLine)
    {
        // If line matches, do nothing
        if (leftLine.text === rightLine.text)
            return;

        // If it doesn't match, calculate the diff
        leftLine.match = false;
        rightLine.match = false;

        var maxLength = Math.max(leftLine.text.length, rightLine.text.length);

        if (maxLength === 0)
            return;

        leftLine.matchMap = [];
        rightLine.matchMap = [];

        for (var i = 0; i < maxLength; i++)
        {
            var leftChar = leftLine.text[i];
            var rightChar = rightLine.text[i];

            if(leftChar === rightChar)
            {
                leftLine.matchMap.push(true);
                rightLine.matchMap.push(true);
            }
            else
            {
                leftLine.matchMap.push(false);
                rightLine.matchMap.push(false);
            }
        }
    };

    _this.GetDiffLines = function (text)
    {
        if (!text)
            return [];

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