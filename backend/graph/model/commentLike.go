package model

type CommentLike struct {
	ID        string `json:"id"`
	UserID    string `json:"user_id"`
	CommentID string `json:"comment_id"`
	IsLike    bool   `json:"is_like"`
}
