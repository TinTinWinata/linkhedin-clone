package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/TinTinWinata/gqlgen/graph/generated"
	"github.com/TinTinWinata/gqlgen/graph/model"
	"github.com/google/uuid"
)

// User is the resolver for the User field.
func (r *commentResolver) User(ctx context.Context, obj *model.Comment) (*model.User, error) {
	var model *model.User
	return model, r.DB.First(&model, "id = ?", obj.UserID).Error
}

// Replies is the resolver for the Replies field.
func (r *commentResolver) Replies(ctx context.Context, obj *model.Comment) ([]*model.ReplyComment, error) {
	var models []*model.ReplyComment
	return models, r.DB.Where("comment_id = ?", obj.ID).Find(&models).Error
}

// CreateComment is the resolver for the createComment field.
func (r *mutationResolver) CreateComment(ctx context.Context, input model.NewComment) (string, error) {
	var post *model.Post

	err := r.DB.First(&post, "id = ?", input.PostID).Error
	if err != nil {
		return "Error", err
	}

	post.Comments = post.Comments + 1
	err = r.DB.Save(post).Error
	if err != nil {
		return "Error", err
	}

	model := &model.Comment{
		ID:     uuid.NewString(),
		Text:   input.Text,
		Likes:  0,
		UserID: input.UserID,
		PostID: input.PostID,
	}
	return "Ok", r.DB.Create(model).Error
}

// RepliesComment is the resolver for the repliesComment field.
func (r *mutationResolver) RepliesComment(ctx context.Context, input model.NewRepliesComment) (string, error) {
	model := &model.ReplyComment{
		ID:        uuid.NewString(),
		CommentID: input.CommendID,
		Text:      input.Text,
		Likes:     0,
		UserID:    input.UserID,
	}
	return "Ok", r.DB.Create(model).Error
}

// LikeComment is the resolver for the likeComment field.
func (r *mutationResolver) LikeComment(ctx context.Context, commentID string) (string, error) {
	var model *model.Comment
	if err := r.DB.First(&model, "id = ?", commentID).Error; err != nil {
		return "Error", err
	}
	model.Likes = model.Likes + 1
	return "Ok", r.DB.Save(model).Error
}

// SeeCommentOnPost is the resolver for the seeCommentOnPost field.
func (r *queryResolver) SeeCommentOnPost(ctx context.Context, postID string) ([]*model.Comment, error) {
	var models []*model.Comment
	return models, r.DB.Where("post_id = ?", postID).Find(&models).Error
}

// User is the resolver for the User field.
func (r *replyCommentResolver) User(ctx context.Context, obj *model.ReplyComment) (*model.User, error) {
	var model *model.User
	return model, r.DB.First(&model, "id = ?", obj.UserID).Error
}

// Comment returns generated.CommentResolver implementation.
func (r *Resolver) Comment() generated.CommentResolver { return &commentResolver{r} }

// ReplyComment returns generated.ReplyCommentResolver implementation.
func (r *Resolver) ReplyComment() generated.ReplyCommentResolver { return &replyCommentResolver{r} }

type commentResolver struct{ *Resolver }
type replyCommentResolver struct{ *Resolver }
