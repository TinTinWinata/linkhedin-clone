package model

type Post struct {
	ID             string `json:"id" gorm:"primaryKey"`
	Text           string `json:"text"`
	UserID         string `json:"user_id"`
	AttachmentLink string `json:"attachment_link"`
	// Tag            pq.StringArray `json:"tag" gorm:"type:text[]"`
}
