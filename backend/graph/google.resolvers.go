package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"errors"

	my_auth "github.com/TinTinWinata/gqlgen/auth"
	"github.com/TinTinWinata/gqlgen/graph/model"
	"github.com/google/uuid"
)

// Google is the resolver for the google field.
func (r *mutationResolver) Google(ctx context.Context, input model.GoogleInput) (interface{}, error) {
	// Check Key
	if input.GoogleKey != "googlelinkhedin" {
		return "", errors.New("Wrong Google Key")
	}

	// Checking on Google Database
	var google *model.Google
	r.DB.First(&google, "id = ?", input.GoogleID)

	if google != nil {
		return my_auth.UserLoginWithoutPassword(ctx, input.Email)
	}

	// Find Same Email
	var user *model.User
	r.DB.First(&user, "email = ?", input.Email)
	if user != nil {
		newGoogle := &model.Google{
			ID:       uuid.NewString(),
			GoogleID: input.GoogleID,
			UserID:   user.ID,
		}

		err := r.DB.Create(newGoogle).Error
		if err != nil {
			return nil, err
		}
		return my_auth.UserLoginWithoutPassword(ctx, user.Email)
	}

	// Register Account
	newGoogle := &model.Google{
		ID:       uuid.NewString(),
		GoogleID: input.GoogleID,
		UserID:   user.ID,
	}
	err := r.DB.Create(newGoogle).Error
	if err != nil {
		return nil, err
	}
	newUser := model.NewUser{
		Name:     input.Name,
		Password: "googleaccount",
		Email:    input.Email,
	}
	return my_auth.UserRegister(ctx, newUser)
}
