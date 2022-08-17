package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/TinTinWinata/gqlgen/graph/generated"
	"github.com/TinTinWinata/gqlgen/graph/model"
	"github.com/google/uuid"
)

// CreatePost is the resolver for the createPost field.
func (r *mutationResolver) CreatePost(ctx context.Context, input model.NewPost) (string, error) {
	model := &model.Post{
		ID:             uuid.New().String(),
		Text:           input.Text,
		UserID:         input.UserID,
		AttachmentLink: input.AttachmentLink,
	}

	err := r.DB.Create(model).Error
	return "Ok", err
}

// User is the resolver for the User field.
func (r *postResolver) User(ctx context.Context, obj *model.Post) (*model.User, error) {
	var user *model.User
	return user, r.DB.First(&user, "id = ?", obj.UserID).Error
}

// Posts is the resolver for the posts field.
func (r *queryResolver) Posts(ctx context.Context) ([]*model.Post, error) {
	var models []*model.Post
	return models, r.DB.Find(&models).Error
}

// Post returns generated.PostResolver implementation.
func (r *Resolver) Post() generated.PostResolver { return &postResolver{r} }

type postResolver struct{ *Resolver }
