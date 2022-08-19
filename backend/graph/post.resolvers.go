package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"time"

	"github.com/TinTinWinata/gqlgen/graph/generated"
	"github.com/TinTinWinata/gqlgen/graph/model"
	middleware "github.com/TinTinWinata/gqlgen/middlewares"
	"github.com/google/uuid"
)

// LikePost is the resolver for the likePost field.
func (r *mutationResolver) LikePost(ctx context.Context, id string) (string, error) {
	var post *model.Post
	err := r.DB.First(&post, "id = ?", id).Error

	if err != nil {
		return "Error", err
	}

	post.Likes = post.Likes + 1
	return "Ok", r.DB.Save(post).Error
}

// CreatePost is the resolver for the createPost field.
func (r *mutationResolver) CreatePost(ctx context.Context, input model.NewPost) (string, error) {
	model := &model.Post{
		ID:             uuid.New().String(),
		Text:           input.Text,
		UserID:         input.UserID,
		AttachmentLink: input.AttachmentLink,
		CreatedAt:      time.Now(),
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

// PostInfinity is the resolver for the postInfinity field.
func (r *queryResolver) PostInfinity(ctx context.Context, limit int, offset int) ([]*model.Post, error) {
	fmt.Println("LIMIT | OFFSET ", limit, offset)
	val := middleware.CtxValue(ctx)
	var user model.User

	err := r.DB.First(&user, "id = ?", val.ID).Error
	if err != nil {
		return nil, err
	}
	fmt.Println("SECOND", limit, offset)

	var models []*model.Post

	err = r.DB.Raw("select p.id, p.text, p.user_id, p.attachment_link, p.likes, p.sends, p.comments, p.created_at from posts p inner join users u on p.user_id = cast(u.id as text) where p.user_id = any (select unnest(followed_user)  from users where users.id = ? union select unnest(connected_user)  from users where users.id = ? union select cast(? as text)) ORDER BY p.created_at ASC LIMIT ? OFFSET ?", val.ID, val.ID, val.ID, limit, offset).Scan(&models).Error

	if err != nil {
		return nil, err
	}
	fmt.Println("BERAKHIR", limit, offset)
	return models, nil
}

// Post returns generated.PostResolver implementation.
func (r *Resolver) Post() generated.PostResolver { return &postResolver{r} }

type postResolver struct{ *Resolver }
