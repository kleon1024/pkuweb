docker-compose -f nginx-compose.yml up -d
docker-compose -f deploy-compose.yml pull
if [ ! -d "mongodb" ]; then
    docker-compose -f deploy-compose.yml up -d
    sleep 5
    echo "initializing mongodb"
    docker exec pkuweb-mongo-1 mongoimport --username root --password tCaJXhP77xdKR4Y7 \
        --authenticationMechanism SCRAM-SHA-256 \
        -d nx_zhiyuan -c users --file /init/nx_students.json --jsonArray
else
    echo "found existed mongodb"
    docker-compose -f deploy-compose.yml up -d
fi

