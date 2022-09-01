package model

type CommentLikeReply struct {
	ID             string `json:"id"`
	UserID         string `json:"user_id"`
	CommentReplyID string `json:"comment_reply_id"`
	IsLike         bool   `json:"is_like"`
}
