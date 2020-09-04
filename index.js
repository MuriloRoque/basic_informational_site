let http = require("http");
let url = require("url");
let fs = require("fs");

http
  .createServer((req, res) => {
    let parsedUrl = url.parse(req.url, true);
    let pathUrl = parsedUrl.pathname;
    let file;

    if (pathUrl === "/") {
      file = "index.html";
    } else if (pathUrl == "/contact-me") {
      file = "contact-me.html";
    } else if (pathUrl == "/about") {
      file = "about.html";
    } else {
      file = "404.html";
    }

    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write(err);
        res.end();
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      }
    });
  })
  .listen(8080);