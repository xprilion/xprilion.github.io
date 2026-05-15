# Working with Amazon Keyspaces Cassandra distribution using Python

[Cassandra](https://cassandra.apache.org/doc/latest/) is a popular NoSQL database with capabilities to handle massive data by using a distributed array of commodity hardware. After a boring introduction, here's the fun part - Cassandra is a Facebook contribution to the world of Open Source, having been developed to handle the inbox search feature in Facebook almost a decade ago, and since it has been handed over to the [Apache Software Foundation](https://www.apache.org/), it has been among the top open source projects under the organization.

Cassandra powers the highly intensive queries in the applications of several major tech players - Instagram, Netflix, Facebook (before replacing it with HBase and further HBase with MyRocks), Twitter (before replacing it with in-house Manhattan), Walmart Labs, CERN, Cisco WebEx, and many more. You can read an extensive praise-o-logy of Cassandra on this [Ubuntu blog titled What is Cassandra and why are big tech companies using it?](https://ubuntu.com/blog/apache-cassandra-top-benefits)

While it can be a hassle to install and maintain a Cassandra database server online, [Amazon Keyspaces](https://aws.amazon.com/keyspaces/) offering by Amazon Web Services makes it a no-brainer to use. A similar powerful offering is provided by Datastax by the name [Astra](https://www.datastax.com/products/datastax-astra). Both provide a managed service for Cassandra database which you can readily use both for development and production needs. Big plus - you can try both for free!

In this tutorial, I shall be moving ahead with Amazon Keyspaces, considering the dearth of a complete example of how to use it on the Internet. You can very easily modify it to work with Datastax Astra.

First off, before we make any queries, head over to the [Amazon Keyspaces dashboard](https://console.aws.amazon.com/keyspaces/home) and create a Keyspace and a sample Table using the Dashboard or the CQL Editor. Both actions being fairly simple, I shall leave it up to you to [explore how to get it done](https://docs.aws.amazon.com/keyspaces/latest/devguide/getting-started.ddl.html). Let's move ahead with how you can use them with a Python application.

For convenience, I shall assume that the keyspace you created is named `test_keyspace` and the table is named `users`. The definition for `users` table is expected to be -

| Column | Type |
| --- | --- |
| id | uuid |
| name | varchar |
| age | integer |
| city | varchar |

You'll need to download a [Digital Certificate](https://www.comodo.com/resources/small-business/digital-certificates.php) provided by Amazon to be able to connect to Keyspaces since the service only connects through TLS. To do so, use the following command in a terminal window -

```bash
curl https://www.amazontrust.com/repository/AmazonRootCA1.pem -O

```

Create a new folder in your working directory named `.cassandra` and move the `AmazonRootCA1.pem` file there. Just cleaning up the working space, tbh, you can keep it wherever you wish, as long as its accessible to your Python script.

Next, we shall need the `cassandra-driver` library for quick functionality to use Cassandra with Python. Run the following command to install it -

```bash
pip install cassandra-driver

```

Now, we shall write a small barebones wrapper object for our connection with Amazon Keyspaces. Create a file called [`db.py`](http://db.py) in your working directory.

Add the following code to make all necessary imports -

```python
from cassandra.auth import PlainTextAuthProvider
from cassandra.cluster import Cluster
from ssl import SSLContext, PROTOCOL_TLSv1_2, CERT_REQUIRED
from cassandra import ConsistencyLevel
from cassandra.query import SimpleStatement

```

The above imports indicate a few things -
- We're going to be using the `PlainTextAuthProvider` which means at some point we'll need a username and password combination for our connection with the database. We shall come around this.
- `Cluster` indicates that we shall be creating an object of the Cassandra Cluster we connect to. This provides cluster level operations which can be useful for you, but not much in the course of this tutorial.
- `SSLContext, PROTOCOL_TLSv1_2, CERT_REQUIRED` are all required for making a TLS connection to the Amazon Keyspaces service.
- `ConsistencyLevel` if this is a bouncer, we shall get to overcoming it further down in this tutorial.
- `SimpleStatement` is a simple CSQL statement, no wonders here.

Next, let's begin using these imports.

Create a class `Cassandra` and add an initialization constructor which creates and connection to the database service -

```python
class Cassandra:
    def __init__(self):
        ssl_context = SSLContext(PROTOCOL_TLSv1_2)
        ssl_context.load_verify_locations('.cassandra/AmazonRootCA1.pem')
        ssl_context.verify_mode = CERT_REQUIRED
        auth_provider = PlainTextAuthProvider(
            username='ServiceUsername',
            password='ServicePassword')
        self.cluster = Cluster(
            ['cassandra.us-east-1.amazonaws.com'],
            ssl_context=ssl_context,
            auth_provider=auth_provider,
            port=9142)
        self.session = self.cluster.connect("test_keyspace")

```

Notice `ServiceUsername` and `ServicePassword`, you do not yet have them. To create a pair of credentials to use, follow this instructions in [this tutorial](https://docs.aws.amazon.com/keyspaces/latest/devguide/programmatic.credentials.html#programmatic.credentials.ssc).

Your Cluster endpoint ([`cassandra.us-east-1.amazonaws.com`](http://cassandra.us-east-1.amazonaws.com)) could differ from the one I have used in my example. You can find out your endpoint by visiting [this list](https://docs.aws.amazon.com/keyspaces/latest/devguide/programmatic.endpoints.html) and use the endpoint corresponding to your AWS Region.

Now, let's create a method for the `Cassandra` class that we can use to execute queries -

```python
class Cassandra:
    ...
    def execute(self, query):
            return self.session.execute(SimpleStatement(
                query, consistency_level=ConsistencyLevel.LOCAL_QUORUM))

```

Look, we used the `ConsistencyLevel` object here! What is this bird?
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/04/image-14.png)
**Consistency Level** is the number of nodes which need to confirm that a particular write operation into a Cassandra database is successful. In simpler words, since Cassandra is a distributed database, and the data stored in Cassandra is split over multiple nodes, a single write operation is successful only when maximum possible nodes acknowledge the write operation as valid. For this, we use different consistency levels, some of which are - `LOCAL_ONE`, `LOCAL_QUORUM`, `ALL`, etc. You can read more about consistency levels in [this blog by Ashish Rana on GeeksforGeeks](https://www.geeksforgeeks.org/consistency-levels-in-cassandra/).

Currently, Amazon Keyspaces works only with the `LOCAL_QUORUM` consistency level.

Now, we can delve into some action!

Create a new file called [`main.py`](http://main.py) (or whatever fancy wording you can think of in 1 second), and put the following lines in it to try inserting a new entry to the database -

```python
from db import Cassandra

csql = Cassandra()

# Insert Query
results = csql.execute("INSERT INTO users (id, name, age, city) \
                        VALUES (6ab09bec-e68e-48d9-a5f8-97e6fb4c9b47, \
                       'John', 24, 'Delhi')")

```

Now, save the file and try executing it from the terminal using the following command -

```bash
python main.py

```

If the query is successful, you shall see no errors.

Let's try reading the database and see if we've got the entry right. Comment out the Insert query code in the [`main.py`](http://main.py) file and add the following lines -

```python
# Read query
results = csql.execute("SELECT * FROM users")
print([x for x in results])

```

You should see the output similar to this -

```text
[Row(id=UUID('6ab09bec-e68e-48d9-a5f8-97e6fb4c9b47'), city='Delhi', age=24, name='John')]

```

If not, you need to observe the error message and try fixing the code! You can find the full code for this tutorial at - [https://github.com/xprilion/python-amazon-keyspaces](https://github.com/xprilion/python-amazon-keyspaces)

Cassandra can be a great tool if you're looking to build highly scalable and mission-critical applications (given you need something like Cassandra, at all) and Amazon Keyspaces makes it very simple and efficient to use and manage.

It is possible to use Amazon Keyspaces with other backends as well, and I shall leave it for you to explore them at your interest.

Thanks for reading this!