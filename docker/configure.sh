echo "Configuring docker for this computer..."
echo "Starting docker machine: "
docker-machine start
docker-machine rm -f default
docker-machine create -d virtualbox default
eval $(docker-machine env default)
