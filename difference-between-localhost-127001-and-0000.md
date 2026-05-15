# Difference between localhost, 127.0.0.1 and 0.0.0.0

I've been often asked, why do we sometimes need to specify the IP for a program to be `0.0.0.0` in order to get it to be accessible from machines outsides the network. I shall attempt to answer the question in this post.

## What is 127.0.0.1

`127.0.0.1` is the loopback address. It means, whatever request is made, send it back to the same machine. When a remote host calls this, they're actually calling themselves.

## What is [localhost](http://localhost)

[`localhost`](http://localhost) is simply a conventional mapping done in the `hosts` file of the OS. It can be changed. I could ask [`google.com`](http://google.com) to point to my loopback address and that would work same.

## What is 0.0.0.0

`0.0.0.0` is a wildcard for all open routes to the system within the system where the script runs.

## When do you face the need to differentiate between them -

We specifically face the problem of differentiating them in Flask/Django/NodeJS applications because these are runtimes which require the user to define which IP (or routes) to listen on. If you've ever tried web development on PHP, you'd realize that the [`localhost`](http://localhost) web server was accessible using the IP of the computer's LAN as well from other devices (say your mobile). This is because by default Apache listens on `*:80` which essentially means `0.0.0.0:80`, as given in its default virtual host configuration file -

```markdown
# Ensure that Apache listens on port 80
Listen 80
<VirtualHost *:80>  # Notice this
    DocumentRoot "/var/www/html" # OR "C:/xampp/htdocs" for Windows systems with XAMPP installation

    # Other directives here
</VirtualHost>

```