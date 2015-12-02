var static = require("node-static");
var http = require("http");
var config = require("./config.json");

var staticFilesRoot = "./src/wwwroot";
var fileServer = new static.Server(staticFilesRoot);

var port = (process.argv.indexOf("--production") === -1) ? config.port : 80;

http.createServer(function (request, response)
    {
        request.addListener("end", function ()
            {
                fileServer.serve(request, response, function (e, res)
                {
                    if (e)
                    {
                        // If the file wasn't found
                        if (e.status === 404)
                        {
                            fileServer.serveFile("views/_error/404.html", 404, {}, request, response);
                        }
                    }
                });
            })
            .resume();
    })
    .listen(port);

console.log("App listening on http://localhost:" + port);
