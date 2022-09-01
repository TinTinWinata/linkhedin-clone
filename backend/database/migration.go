package database

import "github.com/TinTinWinata/gqlgen/graph/model"

func MigrateTable() {
	db := GetDB()
	db.AutoMigrate(&model.User{})
	db.AutoMigrate(&model.UserValidation{})
	db.AutoMigrate(&model.Post{})
	db.AutoMigrate(&model.ConnectRequest{})
	db.AutoMigrate(&model.Chat{})
	db.AutoMigrate(&model.ChangePasswordRequest{})
	db.AutoMigrate(&model.Google{})
	db.AutoMigrate(&model.Education{})
	db.AutoMigrate(&model.Experience{})
	db.AutoMigrate(&model.Comment{})
	db.AutoMigrate(&model.ReplyComment{})
	db.AutoMigrate(&model.Job{})
	db.AutoMigrate(&model.Notification{})
	db.AutoMigrate(&model.CommentLike{})
	db.AutoMigrate(&model.PostLike{})
	db.AutoMigrate(&model.CommentLikeReply{})
}
