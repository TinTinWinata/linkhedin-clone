package database

import "github.com/TinTinWinata/gqlgen/graph/model"

func MigrateTable() {
	db := GetDB()
	db.AutoMigrate(&model.User{})
}