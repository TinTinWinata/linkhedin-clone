package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/TinTinWinata/gqlgen/graph/model"
	middleware "github.com/TinTinWinata/gqlgen/middlewares"
	"github.com/google/uuid"
)

// CreatePost is the resolver for the createPost field.
func (r *mutationResolver) CreatePost(ctx context.Context, input model.NewPost) (string, error) {
	model := &model.Post{
		ID:     uuid.New().String(),
		Text:   input.Text,
		UserID: input.UserID,
	}

	err := r.DB.Create(model).Error
	return "Ok", err
}

// Posts is the resolver for the posts field.
func (r *queryResolver) Posts(ctx context.Context) ([]*model.Post, error) {
	val := *middleware.CtxValue(ctx)
	var user *model.User
	err := r.DB.First(&user, "id = ?", val.ID).Error
	if err != nil {
		return nil, err
	}
	var models []*model.Post
	return models, r.DB.Find(&models).Error
}
