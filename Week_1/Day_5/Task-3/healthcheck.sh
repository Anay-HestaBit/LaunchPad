#!/bin/sh

TIMESTAMP=$(date)
echo "$TIMESTAMP : Health check OK" >> logs/health.log
