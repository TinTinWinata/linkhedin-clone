package model

import "gorm.io/gorm"

type ReplyComment struct {
	gorm.Model
	ID        string `json:"id"`
	CommentID string `json:"comment_id"`
	Text      string `json:"text"`
	Likes     int    `json:"likes"`
	UserID    string `json:"user_id" gorm:"reference:User"`
}
