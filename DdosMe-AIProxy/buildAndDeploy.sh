cd ~ &&
cd Desktop/DdosMe/DdosMe-AIproxy &&
docker build -t ddosme-proxy:latest .

cd ~ &&
cd Desktop/DdosMe/DdosMe-backend &&
docker build -t ddosme-backend:latest .

docker network create ddosnw

docker run -d --network ddosnw --name ddosmeProxy -p 3456:3456 ddosme-proxy:latest &&
docker run -d --network ddosnw --name ddosmeBackend -p 3246:3246 --memory="512m" --cpus="0.5" ddosme-backend:latest