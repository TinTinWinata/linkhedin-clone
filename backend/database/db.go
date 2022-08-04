package database

// Database Single

import (
	"database/sql"

	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"
)

var (
	db *bun.DB
)

func getDb() *bun.DB {
	if db == nil {
		dsn := "postgres://postgres:asd@localHost:5432/postgres?sslmode=disable"
		sqldb := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dsn)))
		db = bun.NewDB(sqldb, pgdialect.New())
	}
	return db
}
