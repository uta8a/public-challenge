FROM golang:1.23 as build

WORKDIR /app
COPY go.mod go.mod
COPY go.sum go.sum
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o main .

CMD ["/app/main"]
