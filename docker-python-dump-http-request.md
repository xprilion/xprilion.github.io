# Docker Python Dump HTTP Request Example

This blog is an explanation for the code present in the [github.com/xprilion/docker-python-dump-http-request-example](http://github.com/xprilion/docker-python-dump-http-request-example) repo.

The main purpose of the repo is to create a simple HTTP server developed using Python's Flask framework, hosted in a Docker environment. The server is designed to log HTTP request and response data for debugging or informational purposes. The HTTP server receives requests, stores information about them, and then responds with a JSON representation of the request data.

## Code Explanation

The repo contains the following files:

```plaintext
root/
├── .dockerignore
├── Dockerfile
├── main.py
└── requirements.txt

```

Let's go over these files in sequence of how they appear in the tree structure.

### [.dockerignore](https://github.com/xprilion/docker-python-dump-http-request-example/blob/main/.dockerignore)

The `.dockerignore` file specifies a pattern for each file or directory that should be ignored when building a Docker image using a Dockerfile. Here's what some lines in our `.dockerignore` file means:
- `Dockerfile`: This line tells Docker to ignore the `Dockerfile` itself when building the Docker image. Although it might seem strange, this is a common practice. The `Dockerfile` is used to build the Docker image and is not usually required within the container itself.
- `*.pyc, *.pyo, *.pyd`: These lines tell Docker to ignore Python compiled files. When Python programs run, they often create compiled versions of the Python source code. These files are not needed to run the Python program, as Python can run the source code directly.
- `__pycache__`: This line tells Docker to ignore the **pycache** directory. When Python 3.2 and later versions run, they store compiled files in this directory. These files are not needed to run the Python program.
- `.pytest_cache`: This line tells Docker to ignore the .pytest_cache directory. This directory is created when running tests with pytest, a testing framework for Python. It is not needed to run the Python application, and including it in the Docker image would increase the size of the image without providing any benefits.

### [Dockerfile](https://github.com/xprilion/docker-python-dump-http-request-example/blob/main/Dockerfile)

This Dockerfile outlines the steps to create a Docker image for a Python application:
- `FROM python:3.11-slim`: The base image is the official lightweight Python 3.11 image from Docker Hub.
- `ENV PYTHONUNBUFFERED True`: Sets the environment variable `PYTHONUNBUFFERED` to `True` to allow log messages to be immediately displayed.
- `ENV APP_HOME /app` and `WORKDIR $APP_HOME`: Sets `/app` as the working directory.
- `COPY . ./`: Copies the local code into the Docker image.
- `RUN pip install --no-cache-dir -r requirements.txt`: Installs the Python dependencies from `requirements.txt` file without storing the cache, for a smaller image.
- `CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app`: Specifies the command to run when the Docker container is started. The application is served using the Gunicorn HTTP server, binding to the environment variable `$PORT`, with one worker process and eight threads. The timeout is set to 0 to disable worker timeouts, leaving scaling management to the hosting platform (e.g., Google Cloud Run). The application instance is accessed via `main:app`, where `main` is the Python module (file) and `app` is the Flask application instance.

### [main.py](http://main.py)

The [`main.py`](http://main.py) script is a Flask application that logs HTTP request and response data. Here's what it does:
- **Initialization**: A new Flask application is created and debugging is enabled.
- **Request Saving**: The `save_request` function collects details from the incoming HTTP request, including endpoint, method, cookies, data, headers, arguments, form data, remote address, and file information, if any.
- **Response Saving**: The `save_response` function collects details from the HTTP response, including status code, status message, headers, and response data.
- **Request and Response Logging**: `before_request` logs the HTTP method and endpoint of each incoming request. `after_request` adds CORS headers to the response, logs the response data, and then returns the response.
- **Root Endpoint Handling**: The `hello_world` function responds to HTTP GET requests at the root (`/`) endpoint. It generates a unique identifier for the request, saves the request data, creates a response containing the request data in JSON format, sets a cookie, and returns the response.
- **Server Launch**: The server runs on all network interfaces (`0.0.0.0`) and listens on the port specified by the "PORT" environment variable, or 8080 if not set.

### [requirements.txt](https://github.com/xprilion/docker-python-dump-http-request-example/blob/main/requirements.txt)

A `requirements.txt` file in a Python project is used to specify the dependencies of the project along with their versions (optional).

In this `requirements.txt` file, we load Flask and gunicorn, which are enough for us to build the project. In most real world projects there are far more dependencies and the `requirements.txt` file for such projects may span several dozen lines.

When setting up the project, you can use `pip install -r requirements.txt` to install all of the dependencies. If version numbers are provided, pip will try to install the exact version numbers or else default to the latest available version.

## Code Usage

Now, a quick note on how you can quickly deploy this code to anywhere you want using docker:

**Run the Docker container**: Run the Docker container from the image you just created. Replace `$PORT` with the port number you want to use.

```bash
docker run -p $PORT:8080 -e PORT=8080 my-python-app

```

This command runs the Docker container, mapping the host's `$PORT` to the container's `8080` port, which the Flask application inside the Docker container is listening on.

**Build the Docker image**: Run the following command in the terminal, in the directory containing your Dockerfile. This command builds a Docker image with the tag `my-python-app`.

```bash
docker build -t my-python-app .

```

Remember, you need to have Docker installed on your machine to execute these commands.

In production scenarios, you would push your Docker image to a Docker registry (like Docker Hub, Google Container Registry, or AWS Elastic Container Registry), then pull and run the Docker image from machines where you want your application to run. Also, orchestration tools like Kubernetes, Docker Swarm, or managed services like Google Cloud Run, AWS ECS/Fargate could be used to handle deployment, scaling, and management of Docker containers in a production setting.

When you hit the endpoint created by deploying this code, you'll get a response similar to the one below:

```json
{
    "uuid": "f50cc7d0f26511eda4bb75c989e55f1e",
    "endpoint": "hello_world",
    "method": "GET",
    "cookies": {
        "cookie-name": "cookie-value"
    },
    "data": "b''",
    "headers": {
        "Host": "test-cloud-run-custom.xpri.dev",
        "Cache-Control": "max-age=0",
        "Sec-Ch-Ua": "\"Chromium\";v=\"112\", \"Google Chrome\";v=\"112\", \"Not:A-Brand\";v=\"99\"",
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": "\"macOS\"",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Sec-Ch-Ua-Arch": "\"arm\"",
        "Sec-Ch-Ua-Platform-Version": "\"13.3.1\"",
        "Sec-Ch-Ua-Model": "\"\"",
        "Sec-Ch-Ua-Bitness": "\"64\"",
        "Sec-Ch-Ua-Wow64": "?0",
        "Sec-Ch-Ua-Full-Version-List": "\"Chromium\";v=\"112.0.5615.137\", \"Google Chrome\";v=\"112.0.5615.137\", \"Not:A-Brand\";v=\"99.0.0.0\"",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-User": "?1",
        "Sec-Fetch-Dest": "document",
        "Accept-Language": "en-US,en;q=0.9",
        "X-Cloud-Trace-Context": "7361fa590088de543df325a9832ab85e/4131215564459013469",
        "Traceparent": "00-7361fa590088de543df325a9832ab85e-395506aaf224f55d-00",
        "X-Forwarded-For": "2401:4900:xxxx:xxxx:xxxx:5400:xxxx:xxxx",
        "X-Forwarded-Proto": "https",
        "Forwarded": "for=\"[2401:4900:xxxx:xxxx:xxxx:5400:xxxx:xxxx]\";proto=https",
        "Accept-Encoding": "gzip, deflate, br"
    },
    "args": {},
    "form": {},
    "remote_addr": "169.xxx.xxx.xxx",
    "files": []
}

```

This response is a JSON representation of the details of an HTTP GET request received by the server. Let's break down what each key-value pair means:
- `"uuid": "f50cc7d0f26511eda4bb75c989e55f1e"`: This is a unique identifier for this request.
- `"endpoint": "hello_world"`: The name of the endpoint that was hit. It corresponds to the function handling the request in the Flask application.
- `"method": "GET"`: The HTTP method used for this request.
- `"cookies": {"cookie-name": "cookie-value"}`: The cookies sent with this request. In this case, there is one cookie named "cookie-name" with a value of "cookie-value".
- `"data": "b''"`: The data sent with this request. In this case, no data was sent.
- `"headers"`: This is a dictionary containing all the HTTP headers that were sent with the request. This includes information about the client, the accepted response types, and more.
- `"args": {}` and `"form": {}`: These would contain any query parameters or form data sent with the request. In this case, none were sent.
- `"remote_addr": "169.254.1.1"`: This is the IP address of the client that sent the request.
- `"files": []`: This would contain any files sent with the request. In this case, none were sent.

The server logs all of these details for each request it receives. This can be useful for debugging, analytics, and other purposes.