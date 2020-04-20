# RedisDemoApp

 > This is a simple application where i designed few basic  functionality of redis Database . I created apis for every operations in future we can convert this to a command line application.

currently supported operations.
* SET 
* GET
* EXPIRE
* ZRANK
* ZADD
* ZRANGE
* TTL
* ZCARD

# Setup
The API requires Node.js v 10.18.1 and npm v 6.13.4

### To set up and running:

* Clone the repo.
```git clone https://github.com/kishan75/redisDemoApp ```
* open terminal into directory
* Setup the application by installing its dependencies with by ```  npm install ```
* by ``` npm start``` command, project will be running on http://localhost:3000/.

```sh
$ git clone https://github.com/kishan75/redisDemoApp
$ cd redisDemoApp/
$ npm start
```
* You can pass specific port number , if we want by providing port number in env variable during npm start 
* for exmaple you want to start on port no. 3001

```sh
$ PORT = 3001 npm start
```
* you can pass persistence interval so at every interval it will rewrite the data
* if you dont want to pass it wll set 3sec default value
* for example you want to set 6 second
```sh
$ PERSISTENT_INTERVAL = 6000 npm start
```

# API Description or Commands

#### /allParagraph  *(POST)*
* this is *POST API* which takes multiple paragraph in body
* keyName:*paragraph* 
* value:any *string*
* perform parsing work

| END-POINT | TYPE | REQUEST-BODY| REQUEST-PARAMS| RESPONSE | ON ERROR or Wrong REQUEST | DESCRIPTION
| ------ | ------ |----|----|----|-----|------|
|/get/:key|GET|-|key *(string)*|value of a key | nil| this is to fetch value of a key|
|/set|POST|key *(string)* ,value *(string,number)* |-|OK|nil|to set value with key |
|/zadd|POST|setName *(string)*, key *(string)*, score *(int)*|-|1 (add), 0(update)|nil|this is to create or update keys in ordered set|
|/expire|POST|key *(string)*, time *(milliseconds)*|-|1|0|key will expire after given milliseconds|
|/zrank/:orderdSetName/:key|GET|-|orderdSetName *(string)*,key *(string)*|rank in int (0 based)|nil|will give rank in descending order for example 0-> rank : 0 and 1-> rank:1|
|/zrange/:orderdSetName/:range1/:range2|GET|-|orderdSetName *(string)*,range1 *(int)*,range2 *(int)*|[ { key: *(string)*,score: *(int)* }]|nil|will give array of objects where object will contain key and score, score will be range1 >= score <= range2|
|/ttl/:key|GET|-|key *(string)*|milliseconds *(int)*|nil|will give time in ms that after that ms it will get removed|
|/zcard/:orderdSetName|GET|-|orderdSetName *(string)*|size of set *(int)*|nil|will give size of a orderd set|


# TechStack
* [NodeJs](https://nodejs.org/en/about/) : single threaded ,async ,non blocking 


# Todos

 * Add more data types : list , set , hashmap
 * Add integrity check
 * Can be select better format of data storing
 * Add method to remove expired key
