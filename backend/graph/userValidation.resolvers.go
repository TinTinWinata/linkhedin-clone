package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/TinTinWinata/gqlgen/graph/model"
	"github.com/google/uuid"
)

// CreateUserValidation is the resolver for the createUserValidation field.
func (r *mutationResolver) CreateUserValidation(ctx context.Context, input model.NewLink) (string, error) {
	model := &model.UserValidation{
		ID:     uuid.New().String(),
		Link:   input.Link,
		UserID: input.UserID,
	}

	err := r.DB.Create(model).Error
	if err != nil {
		return "Error", err
	} else {
		return "Succesfully insert user link validation", err
	}
}
