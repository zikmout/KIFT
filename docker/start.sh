echo "Building Image..."
docker build -t kift:v1 .
echo "Now running Image: "
docker run -it -p 4242:4242 kift:v1
