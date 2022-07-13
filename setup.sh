#!/bin/bash

set -e # abort on error
set -x # verbose

CURPATH=$(dirname ${0})
cd ${CURPATH}
CURPATH=$(pwd)

JURASSIC_TAG=${JURASSIC_TAG:-${CI_PIPELINE_ID:-latest}}
JOB_NAME=${JOB_NAME:-${CI_JOB_NAME:-local}}

if [[ "${URL_REGISTRY}" != "" ]]; then
    REGISTRY="${URL_REGISTRY}:${PORT_REGISTRY}"
else
    REGISTRY="registry.aum-bio.tech:2070"
fi


setup_var()
{

    case "${JOB_NAME}" in
        *"preprod"*) JURASSIC_ENV="preprod";;
        *"prod"*)    JURASSIC_ENV="prod";;
        *"local"*)   JURASSIC_ENV="local";;

    esac

    NETWORK=jurassic-${JURASSIC_ENV}-net
    APP_CONTAINER_NAME=jurassic-${JURASSIC_ENV}
    DB_VOLUME_NAME=jurassic-${JURASSIC_ENV}-db-data

    # Subtitute vars in .env for docker-compose usage

    sed -i "s/REGISTRY=unknown/REGISTRY=${REGISTRY}\//g" ./docker-compose/.env
    sed -i "s/JURASSIC_TAG=latest/JURASSIC_TAG=${JURASSIC_TAG}/g" ./docker-compose/.env
    sed -i "s/NETWORK=unknown/NETWORK=${NETWORK}/g" ./docker-compose/.env
    sed -i "s/DB_VOLUME_NAME=unknown/DB_VOLUME_NAME=${DB_VOLUME_NAME}/g" ./docker-compose/.env
    sed -i "s/APP_CONTAINER_NAME=unknown/APP_CONTAINER_NAME=${APP_CONTAINER_NAME}/g" ./docker-compose/.env
}

setup_var

# build jurassic images

build_jurassic()
{
    docker-compose -f ./docker-compose/docker-compose.yml build ${1}
}

# push jurassic images to registry

push_jurassic()
{
    docker-compose -f ./docker-compose/docker-compose.yml push
}

# pull jurassic from registry

pull_jurassic()
{
    docker-compose -f ./docker-compose/docker-compose.yml pull
}

# tag jurassic images

tag_image()
{
    docker tag "${REGISTRY}/jurassic-${1}:${JURASSIC_TAG}" "${REGISTRY}/jurassic-${1}:latest"
}

# untag jurassic images

untag_image()
{
    docker rmi "${REGISTRY}/jurassic-${1}:${JURASSIC_TAG}"
}

# stop and remove jurassic containers

down_jurassic()
{
    docker-compose -f ./docker-compose/docker-compose.yml down
}

# run jurassic containers

start_jurassic()
{
    down_jurassic
    sed -i "s/JURASSIC_TAG=${JURASSIC_TAG}/JURASSIC_TAG=latest/g" ./docker-compose/.env
    docker-compose  -f ./docker-compose/docker-compose.yml up -d 
}

usage_and_die()
{

    echo "Usage: $0 build_jurassic | push_jurassic | pull_jurassic | tag_images | untag_images | down_jurassic | start_jurassic |"
    exit 0
}


if [ $# -eq 0 ]; then
    usage_and_die
fi

while [ ! $# -eq 0 ]; do
    case $1 in
        build_jurassic)
            build_jurassic "backend"
            build_jurassic "frontend"
            ;;
        push_jurassic)
            push_jurassic
            ;;
        pull_jurassic)
            pull_jurassic
            ;;
        tag_images)
            tag_image "backend"
            tag_image "frontend"
            ;;
        untag_images)
            untag_image "backend"
            untag_image "frontend"
            ;;
        down_jurassic)
            down_jurassic
            ;;
        start_jurassic)
            start_jurassic
            ;;
        *)
            usage_and_die
            ;;
    esac
    shift
done

exit 0
