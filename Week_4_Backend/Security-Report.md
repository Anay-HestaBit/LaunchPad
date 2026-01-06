Manual Security test cases :->

1. Payload whitelisting:->
   {
   "name": "Phone",
   "price": 300,
   "isAdmin": true -> This will get stripped
   }

Result :->
{
"success": false,
"message": "Validation error",
"errors": [
"Unrecognized key: \"isValid\""
]
}

2.Wrong Datatype :->
{
"name": "Phone",
"price": "cheap"
}

Result :->
{
"success": false,
"message": "Validation error",
"errors": [
"Invalid input: expected number, received string"
]
}

3.NoSQL injection :->
{
"email": { "$gt": "" }
}

Result :->
{
"success": false,
"message": "Validation error",
"errors": [
"Invalid input: expected string, received object" // expected String and received object due to NoSQL injection
]
}

4. Rate limiting :->

max = 10 , times a user can hit this end point :-> http://localhost:3000/api/register/

Hitting more than that : ->

res => Too many requests, please try again later.

5. Payload Size limits :->

max size of the payload :-> 10kb

GET/http://localhost:3000/products/

and json body :->

{
"name" : "anay gupta",
"description" : "Too large", // this make this json payload size more than 10 kb
"price" : 80000
}

Res => PayloadTooLargeError: request entity too large
at readStream (/home/anaygupta/Desktop/Launchpad/Week-4/node-modules/raw-body/index.js:163:17)
at getRawBody (/home/anaygupta/Desktop/Launchpad/Week-4/node-modules/raw-body/index.js:116:12)
at read (/home/anaygupta/Desktop/Launchpad/Week-4/node-modules/body-parser/lib/read.js:114:3)
at jsonParser (/home/anaygupta/Desktop/Launchpad/Week-4/node-modules/body-parser/lib/types/json.js:90:5)
at Layer.handleRequest (/home/anaygupta/Desktop/Launchpad/Week-4/node-modules/router/lib/layer.js:152:17)
at trimPrefix (/home/anaygupta/Desktop/Launchpad/Week-4/node-modules/router/index.js:342:13)
at /home/anaygupta/Desktop/Launchpad/Week-4/node-modules/router/index.js:297:9
at processParams (/home/anaygupta/Desktop/Launchpad/Week-4/node-modules/router/index.js:582:12)
at next (/home/anaygupta/Desktop/Launchpad/Week-4/node-modules/router/index.js:291:5)
at router.handle (/home/anaygupta/Desktop/Launchpad/Week-4/node-modules/router/index.js:186:3)

6. helmet() => Nodejs middleware for express
   eg -> Different origin cannot embed our site page : in an iframe :

For this create a index.html file :

/home/anaygupta/Desktop/Launchpad/Week-4/src/index.html

and in the src = "http://localhost:3000/user" now attacker tries to access this page but get this error :

Framing 'http://localhost:3000/' violates the following Content Security Policy directive: "frame-ancestors 'self'". The request has been blocked.

due to helmet middleware , which has this : X-Frame-Options: SAMEORIGIN , in the header will not allow to embed this page to different website or different origin ....
