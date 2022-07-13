# How to install/develop on jurassic
## SETUP
## Backend
#### Requirements
* python 3 (with virtualenv and pip)
* pgsql database server with postgres
#### Instructions
Starting from the repository root directory, go to the “jurassic” directory (the one containing this file), then : 
Go to the backend directory:
```
cd backend
```
create the virtualenv: 
```
python3 -m venv env
```
##### Activate the virtual env
---
Mac OS:
```
. env/bin/activate
```
In the backend dependencies: 
On Mac OS : you will need to install PostgreSQL with [brew](https://brew.sh/index_fr) before installing the dependencies, because you won’t be able to install psycopg2 without it:
```
brew install postgresql export LDFLAGS="-I/usr/local/opt/openssl/include -L/usr/local/opt/openssl/lib"
```

---
Windows OS:
```
source ./venv/Scripts/activate
```
Or if source command not recognized
```
venv\Scripts\activate.bat
```
If you use Windows download PostgresSQL [here](https://www.postgresql.org/download/windows/)

---


```
pip install -r ./requirements.txt
```
Create new file jurassic.cfg

```
db_host=localhost
db_port=5432
db_name=“bd_name”
db_user=postgres
db_password=“password”
front_end_protocol=http
front_end_domain=localhost:4200
```

## Frontend
### Requierements
* nodejs (>=v10) and npm (node package manager)
#### Instruction 

Go to the frontend directory
```
cd frontend
```
Install dependencies:
```
npm install —no-save
```
---
You may want to install the angular command line tools(cli) globally (will require root access on linux)
```
sudo npm install -g @angular/cli --no-save
```
---
Run the frontend build:
```
npm start 
```
Open browser on localhost:4200

## Run Docker environment for first time

Go to jurassicparc/backend directory
```
cd backend
```
Activate virtual environment and create docker image for backend

---
Mac OS:
```
. env/bin/activate
```
---
Windows OS:
```
source ./venv/Scripts/activate
```
If you use Windows:
Be shure to configure your files (dockerfile, gunicorn_config.py, .dockerignore, docker-compose.yml and entrypoint.sh) with LF for "Select End of Line Sequence"
In VScode, you can modify it by clicking on the right of UTF-8, usualy if it's not LF already it will be CRLF

---
```
python app.py -u postgres -p 'password' -d 'db_name'
docker build -t jurassic_backend .
```
Go to jurassicparc/frontend directory
```
cd frontend
```
Create docker image for frontend .
```
docker build -t jurassic_frontend .
```
Go to jurassicparc directory and create the docker compose
```
docker-compose up -d
```
Open browser on localhost:4567
## Run Docker environment after a first initialisation

Jurassicpark directory
```
docker-compose stop
docker-compose rm -f
docker-compose build
docker-compose up -d
```
Open browser on localhost:4567
