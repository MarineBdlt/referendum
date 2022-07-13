#!/bin/bash

cd /app
source /venv/bin/activate
exec gunicorn -w 4 -b "0.0.0.0:5000" \
	--env JURASSIC_DB_HOST="${JURASSIC_DB_HOST}" \
	--env JURASSIC_DB_PORT="${JURASSIC_DB_PORT}" \
	--env JURASSIC_DB_NAME="${JURASSIC_DB_NAME}" \
	--env JURASSIC_DB_USER="${JURASSIC_DB_USER}" \
	--env JURASSIC_DB_PASSWORD="${JURASSIC_DB_PASSWORD}" \
        --config gunicorn_config.py \
	"app:app"
