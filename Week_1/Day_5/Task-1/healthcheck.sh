#!/bin/bash

URL="http://localhost:3000"

LOG_DIR="./logs"
LOG_FILE="$LOG_DIR/health.log"

mkdir -p "$LOG_DIR"

echo "🔄 Starting health check... (ping every 10 seconds)"
echo "Logs will be saved in $LOG_FILE"
echo "Press CTRL + C to stop"

while true; do
  STATUS=$(curl -o /dev/null -s -w "%{http_code}" "$URL")

  if [ "$STATUS" -ne 200 ]; then
    echo "$(date) - Health check failed with status $STATUS" >> "$LOG_FILE"
  fi

  sleep 10
done
