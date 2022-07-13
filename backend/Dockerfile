ARG PYTHON_SLIM_IMAGE_TAG

FROM python:${PYTHON_SLIM_IMAGE_TAG}

RUN apt-get update -y \
    && apt-get dist-upgrade -y \
    && pip install virtualenv \
    && python3 -m virtualenv -p python3 venv \
    && mkdir -p /app/api /app/model /app/services /app/utils

COPY ./requirements.txt /app
RUN chmod -R +x ./venv/bin/activate
RUN ./venv/bin/activate && pip install -r /app/requirements.txt

COPY ./entrypoint.sh /
COPY ./gunicorn_config.py /app
RUN chmod +x /entrypoint.sh

COPY ./api /app/api
COPY ./model /app/model
COPY ./services /app/services
COPY ./utils /app/utils
COPY ./app.py /app

EXPOSE 5000

ENTRYPOINT ["/entrypoint.sh"]
