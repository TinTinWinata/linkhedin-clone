# syntax=docker/dockerfile:1

FROM golang:1.18.4

WORKDIR /usr/src/app

COPY go.mod ./
COPY go.sum ./
RUN go mod download & go mod verify

COPY . .

RUN go build

EXPOSE 8080

CMD [ "./gqlgen" ]