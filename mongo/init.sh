#!/usr/bin/env bash
echo "Creating mongo users..."
mongo admin --host localhost -u root -p rootPass --eval "db.createUser({user: 'admin', pwd: 'tCaJXhP77xdKR4Y7', roles: [{role: 'userAdminAnyDatabase', db: 'admin'}]});"
mongo admin -u root -p rootPass << EOF
use nx_zhiyuan
db.createUser({user: 'pku', pwd: 'tCaJXhP77xdKR4Y7', roles:[{role:'readWrite',db:'nx_zhiyuan'}]})
EOF
echo "Mongo users created."