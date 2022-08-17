package database

import "github.com/TinTinWinata/gqlgen/graph/model"

func MigrateTable() {
	db := GetDB()
	db.AutoMigrate(&model.User{})
	db.AutoMigrate(&model.UserValidation{})
	db.AutoMigrate(&model.Post{})
	db.AutoMigrate(&model.ConnectRequest{})
}
