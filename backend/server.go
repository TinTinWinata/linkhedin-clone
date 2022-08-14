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
	"github.com/gorilla/mux"
)

const defaultPort = "8080"

func main() {

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	db := database.GetDB()
	database.MigrateTable()

	router := mux.NewRouter()
	router.Use(middleware.AuthMiddleware)

	config := generated.Config{Resolvers: &graph.Resolver{
		DB: db,
	}}
	config.Directives.Auth = directives.Auth

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(config))

	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)

	// http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
