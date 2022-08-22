package model

type Comment struct {
	ID     string `json:"id"`
	Text   string `json:"text"`
	UserID string `json:"user_id"`
	PostID string `json:"post_id"`
}
