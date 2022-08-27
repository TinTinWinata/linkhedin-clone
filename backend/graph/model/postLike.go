package model

type PostLike struct {
	ID     string `json:"id"`
	UserID string `json:"user_id"`
	PostID string `json:"post_id"`
	IsLike bool   `json:"is_like"`
}
