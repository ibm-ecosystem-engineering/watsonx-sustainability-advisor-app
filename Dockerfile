# Build step #1: build the React front end
FROM node:16-alpine as build-step
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY src/ ./src
COPY public/ ./public
RUN yarn install 
RUN yarn build


# Build step #2: build the API with the client as static files
FROM python:3.9-slim-buster
WORKDIR /app
COPY --from=build-step /app/build ./build/

RUN apt update && \
    apt install --no-install-recommends -y build-essential gcc && \
    apt clean && rm -rf /var/lib/apt/lists/* && mkdir ./api

COPY requirements.txt ./api/
COPY app/ ./api/app
COPY datasets/ ./api/datasets

RUN pip install --no-cache-dir -r ./api/requirements.txt

ENV FLASK_ENV production

EXPOSE 3001
WORKDIR /app/api

# CMD ["gunicorn", "-b", ":3000", "api:app"]
CMD ["python", "-u", "./app/main.py"]