package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/TinTinWinata/gqlgen/graph/model"
	middleware "github.com/TinTinWinata/gqlgen/middlewares"
	"github.com/google/uuid"
)

// LikePost is the resolver for the likePost field.
func (r *mutationResolver) LikePost(ctx context.Context, id string) (string, error) {
	fmt.Println("disini_0")
	val := *middleware.CtxValue(ctx)
	fmt.Println("disini_1")
	var model *model.PostLike
	fmt.Println("disini_2")
	err := r.DB.Where("post_id = ? AND user_id = ?", id, val.ID).Take(&model).Error
	fmt.Println("disini_3")
	if err == nil {
		// Already Exists
		model.IsLike = !model.IsLike
		return "Ok", r.DB.Save(&model).Error
	} else {
		// Not Exists
		model.ID = uuid.NewString()
		model.PostID = id
		model.UserID = val.ID
		model.IsLike = true
		return "Ok", r.DB.Create(&model).Error
	}
}
