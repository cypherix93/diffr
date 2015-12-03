var nodeStatic = require("node-static");
var http = require("http");
var config = require("./config.json");

var staticFilesRoot = "./src/wwwroot";
var fileServer = new nodeStatic.Server(staticFilesRoot);

var port = (process.argv.indexOf("--production") === -1) ? config.port : 80;

http.createServer(function (req, res)
{
    req.addListener("end", function ()
    {
        fileServer.serve(req, res, function (err, result)
        {
            if (err)
            {
                // If the file wasn't found
                if (err.status === 404)
                {
                    fileServer.serveFile("views/error/404.html", 404, {}, req, res);
                }
            }
        });
    })
    .resume();
})
.listen(port);

console.log("App listening on http://localhost:" + port);
