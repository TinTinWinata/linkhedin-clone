package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/TinTinWinata/gqlgen/database"
	"github.com/TinTinWinata/gqlgen/graph"
	directives "github.com/TinTinWinata/gqlgen/graph/directive"
	"github.com/TinTinWinata/gqlgen/graph/generated"
	middleware "github.com/TinTinWinata/gqlgen/middlewares"
	"github.com/TinTinWinata/gqlgen/websocket"
	"github.com/gorilla/mux"
)

const defaultPort = "8080"

func MyCors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Add("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization, Token")
		w.Header().Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("content-type", "application/json;charset=UTF-8")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	db := database.GetDB()
	database.MigrateTable()

	websocket.AllRooms.Init()

	router := mux.NewRouter()
	router.Use(MyCors)
	router.Use(middleware.AuthMiddleware)

	config := generated.Config{Resolvers: &graph.Resolver{
		DB: db,
	}}

	config.Directives.Auth = directives.Auth
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(config))

	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)

	router.HandleFunc("/server/create", websocket.CreateRoomRequestHandler)
	router.HandleFunc("/server/join", websocket.JoinRoomRequestHandler)

	// http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
