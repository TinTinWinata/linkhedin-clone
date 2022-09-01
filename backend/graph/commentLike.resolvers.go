package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/TinTinWinata/gqlgen/graph/model"
	middleware "github.com/TinTinWinata/gqlgen/middlewares"
	"github.com/google/uuid"
)

// NewLikeComment is the resolver for the newLikeComment field.
func (r *mutationResolver) NewLikeComment(ctx context.Context, commentID string) (string, error) {
	val := *middleware.CtxValue(ctx)
	var model *model.CommentLike
	err := r.DB.Where("comment_id = ? AND user_id = ?", commentID, val.ID).Take(&model).Error

	if err == nil {
		// Already Exists
		model.IsLike = !model.IsLike
		return "Ok", r.DB.Save(&model).Error
	} else {
		// Not Exists
		model.ID = uuid.NewString()
		model.CommentID = commentID
		model.UserID = val.ID
		model.IsLike = true
		return "Ok", r.DB.Create(&model).Error
	}
}

// LikeReplyComment is the resolver for the likeReplyComment field.
func (r *mutationResolver) LikeReplyComment(ctx context.Context, replycommentID string) (string, error) {
	val := *middleware.CtxValue(ctx)
	var model *model.CommentLikeReply
	err := r.DB.Where("comment_reply_id = ? AND user_id = ?", replycommentID, val.ID).Take(&model).Error

	if err == nil {
		// Already Exists
		model.IsLike = !model.IsLike
		return "Ok", r.DB.Save(&model).Error
	} else {
		// Not Exists
		model.ID = uuid.NewString()
		model.CommentReplyID = replycommentID
		model.UserID = val.ID
		model.IsLike = true
		return "Ok", r.DB.Create(&model).Error
	}
}
