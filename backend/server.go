package main

import (
	"context"
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"
)

// PG WITH BUN

// Cara HE
// func handleRoute(w http.ResponseWriter, r *http.Request){
//  fmt.Fprintln(w, "<h1>Ini halo dari go</h1>")
// }

// func main() {
//  http.HandleFunc("/", handleRoute)
//  err := http.ListenAndServe(":4321", nil)
//  if err != nil{
//   fmt.Println(err)
//  }
// }

type album struct {
	ID     string  `json:"id"`
	Title  string  `json:"title"`
	Artist string  `json:"artist"`
	Price  float64 `json:"price"`
}

var albums = []album{
	{ID: "1", Title: "Blue Train", Artist: "John Coltrane", Price: 56.99},
	{ID: "2", Title: "Jeru", Artist: "Gerry Mulligan", Price: 17.99},
	{ID: "3", Title: "Sarah Vaughan and Clifford Brown", Artist: "Sarah Vaughan", Price: 39.99},
}

func getAlbums(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, albums)
}

type User struct {
	bun.BaseModel `bun:"table:users"`
	Id            uint   `bun:"user_id,pk,autoincrement" `
	Email         string `bun:"email,notnull"`
	Name          string `bun:"name,notnull"`
	Password      string `bun:"password,notnull"`
}

func main() {
	dsn := "postgres://postgres:asd@localHost:5432/postgres?sslmode=disable"
	sqldb := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dsn)))
	db := bun.NewDB(sqldb, pgdialect.New())

	ctx := context.Background()

	// GET

	// Ngambil 1 doang
	// user := new(User)
	// err := db.NewSelect().Model(user).Scan(ctx)

	// Ngambil lebih dari 1
	users := []User{}
	err := db.NewSelect().Model(&users).Scan(ctx)

	if err != nil {
		panic(err)
	}

	fmt.Println(users)

	// POST
	// newuser := &User{
	// 	Name:     "Vito Gustianto",
	// 	Email:    "vito@gmail.com",
	// 	Password: "inipassword",
	// }

	// result, err := db.NewInsert().Model(newuser).Exec(ctx)

	// if err != nil {
	// panic(err)
	// }

	// fmt.Println(result)

	// PUT
	// changedUser := &User{
	// 	Id:       2,
	// 	Name:     "Justine Winata",
	// 	Email:    "justine@gmail.com",
	// 	Password: "justinewinata",
	// }

	// res, err := db.NewUpdate().Model(changedUser).WherePK().Exec(ctx)

	// if err != nil {
	// 	panic(err)
	// }

	// fmt.Println(res)

	// DELETE

	// res, err := db.NewDelete().Model(&User{}).Where("user_id = ?", 3).Exec(ctx)

	// if err != nil {
	// 	panic(err)
	// }

	// fmt.Println(res)

	router := gin.Default()
	router.GET("/album", getAlbums)
	router.Run("localhost:8080")
}
