package model

import (
	"time"

	"github.com/lib/pq"
)

type Post struct {
	ID             string         `json:"id" gorm:"primaryKey"`
	Text           string         `json:"text"`
	UserID         string         `json:"user_id"`
	AttachmentLink string         `json:"attachment_link"`
	Sends          int            `json:"sends"`
	Comments       int            `json:"comments"`
	CreatedAt      time.Time      `json:"created_at"`
	Hashtag        pq.StringArray `json:"hashtag" gorm:"type:text[]"`
	AttachmentType string         `json:"attachment_type"`
}
