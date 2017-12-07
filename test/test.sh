#!/usr/bin/env sh
echo "POSTS"
curl http://localhost:3000/posts
echo "\n ADD"
curl -H "Content-Type: application/json" -X POST -d '{"name": "Top 10 ES6 Features", "url":"http://webapplog.com/es6", "text": ""}'  "http://localhost:3000/posts"
echo "\n-------"
curl http://localhost:3000/posts
echo "\n UPDATE"
curl -H 'Content-Type: application/json' -X PUT -d '{"name": "Top 10 ES6 Features Every Developer Must Know", "url":"http://webapplog.com/es6", "text": ""}' "http://localhost:3000/posts/0"
echo "\n-------"
curl http://localhost:3000/posts
echo "\n ADD SECOND"
curl -H "Content-Type: application/json" -X POST -d '{"name": "second post", "url":"http://webapplog.com/es6", "text": ""}'  "http://localhost:3000/posts"
echo "\n-------"
curl http://localhost:3000/posts
echo "\n DELETE "
curl -X DELETE "http://localhost:3000/posts/0"
echo "\n-------"
curl http://localhost:3000/posts

echo "\n DELETE "
curl -X DELETE "http://localhost:3000/posts/0"
echo "\n-------"
curl http://localhost:3000/posts

echo "\n COMMENTS"
echo "\n ADD POST"
curl -H "Content-Type: application/json" -X POST -d '{"name": "Top 10 ES6 Features", "url":"http://webapplog.com/es6", "text": " so are you to my thoughts"}'  "http://localhost:3000/posts"
echo "\n-------"
curl http://localhost:3000/posts
echo "\n ADD COMMENT"

curl -H "Content-Type: application/json" -X POST -d '{"text": "wow! this is a nice post"}'  "http://localhost:3000/posts/0/comments"
echo "\n GET"
curl http://localhost:3000/posts
curl http://localhost:3000/posts/0/comments
echo "\n DELETE"
curl -X DELETE "http://localhost:3000/posts/0/comments/0"
echo "\n GET"
curl http://localhost:3000/posts
curl http://localhost:3000/posts/0/comments
echo "\n DELETE POST"
curl -X DELETE "http://localhost:3000/posts/0"
echo "\n-------"
curl http://localhost:3000/posts
echo "\n-------"

