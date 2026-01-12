# Reverse Proxy with NGINX (Day 3)

## Architecture

Client → NGINX → api1 / api2

## Why NGINX

- Single entry point
- Hides backend services
- Enables load balancing

## Load Balancing

- Two backend containers
- Round-robin strategy
- Stateless design

## Networking

- Docker bridge network
- Service-name based DNS resolution

## Security

- Only NGINX exposed
- Backends private
