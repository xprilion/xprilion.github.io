# Golang vs Python: API Performance Load Test

In 2016, when I had started learning Python, I was increasingly convinced it would be the last programming language I would learn. After countless projects created with Python, a couple of technical books written, I am now learning Golang.

Why?

While working on [Callchimp.ai](https://callchimp.ai), the team came across a requirement of an efficient multithreading component as part of the system infrastructure. We initially tried to pull it off using Python but the code kept getting very ugly very soon, along with being slightly beyond our understanding of how it was working.

Hence, I decided to take a page from the book of world's multithreading king - Google.

But before I could commit to re-writing the functionality of our component using Golang, I needed concrete numbers to support the "uh..its faster..like zip-zap-zoom faster" comparison of Golang with Python.

Here's a short walkthrough of how I put "zip-zap-zoom faster" into a number.

## Create a minimal Golang server

First up, I created a barebones web server using Golang:

```go
// server.go

package main

import (
	"fmt"
	"net/http"
)

func greetHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, visitor! You've requested: %s\n", r.URL.Path)
}

func main() {
	// Register the greetHandler with the default mux (router)
	http.HandleFunc("/", greetHandler)

	// Start the web server on port 8080 and log any errors
	fmt.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		fmt.Printf("Error starting server: %s\n", err)
	}
}

```

This I compiled to an executable and started its execution on port `8080` using the following commands:

```bash
go build -o mygoserver server.go
./mygoserver

```

Next, I needed an equivalent Python server.

## Create a minimal Python server

Since I was relying on Golang's native http library for the server, it made sense to do the same for Python. Hence, a minimal equivalent server was written:

```python
# server.py

from http.server import BaseHTTPRequestHandler, HTTPServer

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        self.wfile.write(f"Hello, visitor! You've requested: {self.path}\n".encode())

def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler, port=8081):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Starting server on :{port}")
    httpd.serve_forever()

if __name__ == "__main__":
    run()

```

This, I ran on port `8081` using the following command:

```bash
python server.py

```

With the servers up and running, I was ready to start testing them.

## Install a load test tool

To perform the load test, I needed an appropriate tool. I decided to use "rakyll/hey" for this - [https://github.com/rakyll/hey](https://github.com/rakyll/hey). This amazing tool is super lightweight and (interestingly?) written in Golang.

Then I ran the following commands in sequence to generate outputs which I compiled in the table that comes afterwards:

#### Time taken to respond to 10,000 requests, 100 concurrent requests

```bash
time bash -c 'hey -n 10000 -c 100 http://localhost:8080/abc >> /dev/null'
time bash -c 'hey -n 10000 -c 100 http://localhost:8081/abc >> /dev/null'

```

#### How many requests can it respond to in 5 seconds, 100 concurrent requests

```bash
hey -z=5s -c 100 http://localhost:8080/abc
hey -z=5s -c 100 http://localhost:8081/abc

```

#### How many requests can it respond to in 5 seconds, 1 concurrent request

```bash
hey -z=5s -c 1 http://localhost:8080/abc
hey -z=5s -c 1 http://localhost:8081/abc

```

With the tests done, it was time for the moment of truth.

## Compiling the results

After running the tests, I put together my findings in this table -

| Language | Requests | Concurrency | Time Taken | Errors |
| --- | --- | --- | --- | --- |
| Python | 10000 | 100 | ~35s | 658 |
| Go | 10000 | 100 | ~0.149s | 0 |
| Python | 7948 | 100 | 5s | 30 |
| Go | 473766 | 100 | 5s | 0 |
| Python | 8176 | 1 | 5 | 0 |
| Go | 137703 | 1 | 5 | 0 |

Hence the verdict came out to be -
- Single concurrent request: Golang is 17x faster than Python.
- 100 concurrent requests: Golang is 60x faster than Python.

## Conclusion

Friends, Romans, countrymen, I am so learning Golang.