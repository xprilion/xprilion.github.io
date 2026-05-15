# A Generic MongoDB Wrapper API with Flask and PyMongo

---

Hey there, hope you're well! It's been a while since I wrote something here, to my defence I wrote this tutorial about [How to setup a secure, remote JupyterLab workstation](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-jupyterlab-environment-on-ubuntu-18-04) on [DigitalOcean](https://digitalocean.com). Have you not read it yet? Go ahead and explore it if you're interested in the topic! Now, moving ahead.

This blog is going to be about creating a generic wrapper API for your MongoDB installation using Flask and PyMongo. If you've little idea about what these terms mean, here we go -

## 1. PyMongo and MongoDB

When you're working with the cool [MongoDB](https://mongodb.com) using Python, [PyMongo](https://pymongo.readthedocs.io/en/stable/) is your go to tool. The distribution facilitates a full fledged support for interacting with MongoDB databases, local or remote and provides a dead simple way of working with it through your Python code.

## 2. Flask

A very popular library in Python for creating web sites, often preferred for lightweight tasks and more often for creating API servers quickly, [Flask](https://flask.palletsprojects.com) provides a way to have a no-frills web server running in minutes.

## 3. You

![](https://media1.tenor.com/images/07feba4572471b21fd4258b6af83c9c4/tenor.gif)

A super cool person reading this nice blog for whom I hope I can make the time spent here worth!

Now that we're done with the introductions, let's chalk out a plan that we shall follow in this tutorial. Imagine a situation where you have a MongoDB database with yourselves, and are wondering how to use it for some basic [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operations from a remotely running application. Further, to make things interesting, you're unsure what collections in the database your application shall need, or it may even need to create arbitrary collections at any moment. Fortunately, you hit upon the golden idea of creating some public APIs to your database server using Flask which allow just those operations with our without some authentication, as per your need.

While I'm going to leave the (tiny) headache of getting a MongoDB server to you, which you can easily get on many online providers, even for free at some places, I shall begin with the requirements of our API.

## The specification

If you went through the specification of CRUD, you know that we need 4 REST APIs to begin with -

| Action | Method | MongoDB | Parameters | Endpoint |
| --- | --- | --- | --- | --- |
| Create | POST, PUT | Insert | None | [example.com/table](http://example.com/table) |
| Read All/One | GET | Find | None/Resource ID | [example.com/table/[id]](http://example.com/table/%5Bid%5D) |
| Update | POST, PUT, PATCH | Update | Resource ID | [example.com/table/id](http://example.com/table/id) |
| Delete | DELETE | Delete | Resource ID | [example.com/table/id](http://example.com/table/id) |

## The preparation

Now, we shall make sure we have some helper code ready for usage, usually to handle any errors on the API or simply to respond to an "are you alive" ping from anywhere remote.

First off, you'd need the right libraries installed. We shall be using the `flask_pymongo` which is a wrapper around PyMongo with helpers for Flask provided. Besides, we will need the `flask_cors` library to [allow fetching of resources from a different domain](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

```bash
pip install flask, flask_pymongo, flask_cors

```

Let's import these libraries (and others which might be needed) into our script.

### Step 1: Importing libraries

Create a file named [`app.py`](http://app.py) in your working directory. Add the following lines to import all needed libraries -

```python
import os
from flask import Flask, request, make_response
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS
import datetime
from bson.json_util import dumps

```

### Step 2: Setup constants, MongoDB connection and helper objects

Now, let us define the stuff we shall be needing globally in the code.

First, let's create an instance of our Flask app -

```python
app = Flask(__name__)
CORS(app)
APP_ROOT = os.path.dirname(os.path.abspath(__file__))

```

The `CORS(app)` enables CORS for the API we shall run. Next, let's define some HTTP status code responses we shall be making in the API.

```python
# HTTP status code constants
HTTP_SUCCESS_GET_OR_UPDATE          =   200
HTTP_SUCCESS_CREATED                =   201
HTTP_SUCCESS_DELETED                =   204
HTTP_SERVER_ERROR                   =   500
HTTP_NOT_FOUND                      =   404
HTTP_BAD_REQUEST                    =   400

```

Then, create a connection object for PyMongo -

```python
app.config["MONGO_URI"] = "mongodb://username:password@host:port/database?authSource=admin"
mongo = PyMongo(app)

```

Finally, we shall be creating a helper function that prepares the responses our API makes -

```python
def send(data, status_code):
    return make_response(dumps(data), status_code)

```

This function will be responsible for preparing the data before finally giving it out through the API. Sometimes you might want global transforms on all output you're producing, this is where they go.

## The real deal

Now, we can setup the APIs to wrap around PyMongo. Let us start with the `Create` API.

### Step 4: Create API

In this step, I shall first put out the code for you to study, and then attempt explaining it.

```python
@app.route('/<collection_name>', methods=['POST'])
def post_item(collection_name):
    """
        Post one item in collection.
    """
    collection = getattr(mongo.db, collection_name)
    formdata = request.json
    try:
        insert_id = str(collection.insert_one(formdata).inserted_id)
        output = {'message': 'new item created', "_id": insert_id}
        return send(output, HTTP_SUCCESS_CREATED)
    except Exception as e:
        output = {'error' : str(e)}
        return send(output, HTTP_BAD_REQUEST)

```

In the code above, you see that we created a `/<collection_name>` route. This means that we have kept the collection name generic, and whatever collection name is being passed to it, the API will attempt to insert data into it, or if it doesn't exist yet in the database, it will first create the collection and then insert the item.

The API returns an `id` which is useful for entry level operations like reading a single entry, updating it or deleting it.

### Step 5: Read API

Next, we shall create an API to read the entries in the collection. There can be two instances of read - one in which you try to read exactly 1 entry and the other where you need all entries. Let us create these.

First, let's create an API that returns all items in a collection -

```python
@app.route('/<collection_name>', methods=['GET'])
def get_all_items(collection_name):
    """
        Documents in a collection.
    """
    collection = getattr(mongo.db, collection_name)
    output = []
    for q in collection.find():
        output.append(q)
    return send(output, HTTP_SUCCESS_GET_OR_UPDATE)

```

Now, any `GET` request to any `collection_name` will attempt to display all items in that collection. If it does not exist, the API will simply return a blank list, but will not attempt to create the collection.

Then, let's create the route to get information about a single entry -

```python
@app.route('/<collection_name>/<id>', methods=['GET'])
def get_one_item(collection_name, id):
    """
        Get one item from a collection.
    """
    collection = getattr(mongo.db, collection_name)
    r = collection.find_one({'_id': ObjectId(id)})
    if r:
        return send(r, HTTP_SUCCESS_GET_OR_UPDATE)
    else:
        return send({'error' : 'item not found'}, HTTP_NOT_FOUND)

```

Notice that the above route accepts both `collection_name` and `id`. This `id` is the one which is returned in the Create API.

### Step 6: Update API

Now, let's create an API to allow updating one entry at a time. It would need to have both the `collection_name` and `id` parameters and would be accessible by a `PUT` request.

```python
@app.route('/<collection_name>/<id>', methods=['PUT'])
def update_item(collection_name, id):
    """
        Update one item in collection.
    """
    collection = getattr(mongo.db, collection_name)
    r = collection.find_one({'_id': ObjectId(id)})
    if r:
        for key in request.json.keys():
            r[key] = request.json[key]
        try:
            collection.replace_one({"_id": ObjectId(id)}, r)
            output = {'message' : 'item updated'}
            return send(output, HTTP_SUCCESS_GET_OR_UPDATE)
        except Exception as e:
            output = {'error' : str(e)}
            return send(output, HTTP_BAD_REQUEST)
    else:
        output = {'error' : 'item not found'}
        return send(output, HTTP_NOT_FOUND)

```

Note that before we update the item, we check for its existence. You could skip this behaviour and could create an API which attempts to Create or Update, which is a popular requirement in many use cases.

### Step 7: Delete API

A rather simpler API, the Delete API too needs both the `collection_name` and `id` and listens to the `DELETE` request.

```python
@app.route('/<collection_name>/<id>', methods=['DELETE'])
def delete_item(collection_name, id):
    """
        Delete one item from collection.
    """
    collection = getattr(mongo.db, collection_name)
    r = collection.find_one({'_id': ObjectId(id)})
    if r:
        try:
            collection.remove(r["_id"])
            return send("", HTTP_SUCCESS_DELETED)
        except Exception as e:
            output = {'error' : str(e)}
            return send(output, HTTP_BAD_REQUEST)
    else:
        output = {'error' : 'item not found'}
        return send(output, HTTP_NOT_FOUND)

```

## Conclusion

With the above APIs, and any more you might wish to add to it, you can have a simple API wrapper around your MongoDB database which allows you to work with any collection at any moment. To get the full code head over to [https://github.com/xprilion/generic-pymongo-flask](https://github.com/xprilion/generic-pymongo-flask).

If you read through the code in the [`app.py`](http://app.py) on the repository you'll find a few more functions there, which can be a useful addition to your API.

Thanks for making time for going through this tutorial!