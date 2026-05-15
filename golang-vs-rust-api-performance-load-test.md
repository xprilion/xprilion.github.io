# Golang vs Rust: API Performance Load Test

Roughly 8 months back, I wrote [an article comparing the performance of Python against Golang](https://xprilion.com/golang-vs-python-api-performance-load-test/), and the latter emerged a clear winner. I went on to explore Golang at depth and even delivered a few talks in which I leveraged the power of goroutines and channels to build demos which showcased parallel processing and lightweight AI agent containerization.

However, my quest for extreme optimisation kept luring me towards Rust every few weeks, until today, when I decided to make the languages go head-to-head in the one domain I work on often - building APIs. The code used for testing is available here - [https://github.com/xprilion/go-vs-rust-api-performance-test](https://github.com/xprilion/go-vs-rust-api-performance-test). I just ran the tests on my laptop without any changes in RAM/running apps while testing it.

### Setting Up the Servers

To ensure an apples-to-apples comparison, I wrote minimal web servers in both Golang and Rust, which would be subjected to the same load tests. Since both languages offer compiling the code to performant binaries, I did that.

Then I ran the binaries on port `8080` for Golang and `8081` for Rust and stress tested them using the `hey` tool.

#### Golang Server

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
    http.HandleFunc("/", greetHandler)
    fmt.Println("Starting server on :8080")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        fmt.Printf("Error starting server: %s\n", err)
    }
}

```

Compiled and started with:

```bash
go build -o mygoserver server.go
./mygoserver

```

#### Rust Server

```rust
use warp::Filter;

#[tokio::main]
async fn main() {
    let route = warp::path::param()
        .map(|path: String| format!("Hello, visitor! You've requested: /{}", path));
    warp::serve(route).run(([127, 0, 0, 1], 8081)).await;
}

```

Ran it using:

```bash
cargo run --release

```

### Load Testing Tools

I chose to use the `hey` tool for load testing. It's lightweight, written in Golang, and provides insightful metrics such as requests per second, latency distributions, and error rates.

```bash
go install github.com/rakyll/hey@latest

```

### Running the Performance Tests

I conducted a series of load tests on both servers. Here's the breakdown:
- **Time taken to respond to 10,000 requests with 100 concurrent requests**
- **How many requests the servers could handle in 5 seconds with 100 concurrent requests**
- **How many requests the servers could handle in 5 seconds with 1 concurrent request**

### Test Results

The following table summarizes the results of the performance tests.

| Language | Requests | Concurrency | Time Taken | Errors | Requests/sec |
| --- | --- | --- | --- | --- | --- |
| Golang | 10,000 | 100 | 0.176 s | 0 | 95,776.8 |
| Rust | 10,000 | 100 | 0.124 s | 0 | 142,696.9 |
| Golang | 478,958 | 100 | 5 s | 0 | 95,776.8 |
| Rust | 713,630 | 100 | 5 s | 0 | 142,696.9 |
| Golang | 121,973 | 1 | 5 s | 0 | 24,392.8 |
| Rust | 152,649 | 1 | 5 s | 0 | 30,527.5 |

### Breakdown of Results

#### **Test 1: 10,000 Requests, 100 Concurrent Connections**

In this test, Rust outperformed Golang significantly, handling 10,000 requests with 100 concurrent connections in **0.124 seconds**, compared to Golang's **0.176 seconds**. Rust also achieved a higher requests-per-second rate (142,696.9 vs. 95,776.8).

#### **Test 2: 5 Seconds, 100 Concurrent Connections**

Over 5 seconds, Rust processed **713,630 requests**, while Golang managed **478,958**. Once again, Rust demonstrated superior handling of high-concurrency scenarios.

#### **Test 3: 5 Seconds, 1 Concurrent Connection**

Even with only one concurrent connection, Rust managed to outperform Golang, handling **30,527.5 requests per second** compared to Golang's **24,392.8**.

Hence the verdict came out to be:
- **Single concurrent request**: Rust is **1.25x faster than Golang**.
- **100 concurrent requests**: Rust is **1.49x faster than Golang**.

### Conclusion

The results speak for themselves: **Rust** outperforms **Golang** across all tests, particularly under high concurrency. While Golang is still significantly faster than Python (based on earlier tests), Rust offers even better performance with lower latency and higher throughput.

In a world where efficiency matters, it's clear that Rust is an exceptional choice for performance-critical applications. However, Golang's simplicity, ease of use, and its own solid performance still make it a great choice for a wide range of projects.

Friends, Romans, countrymen, I am so learning Rust AND Golang.