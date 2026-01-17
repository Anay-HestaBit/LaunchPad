#!/bin/bash
GREEN='\033[0;32m'
NC='\033[0m' 
if [ ! -f ./certs/cert.pem ]; then
    echo " SSL Certificates missing! Run 'mkcert' first."
    exit 1
fi
docker compose -f docker-compose.prod.yml up -d --build
docker compose ps
echo -e "${GREEN} App is live at https://myApp.local${NC}"