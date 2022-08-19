package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/TinTinWinata/gqlgen/graph/generated"
	"github.com/TinTinWinata/gqlgen/graph/model"
	middleware "github.com/TinTinWinata/gqlgen/middlewares"
	"github.com/google/uuid"
)

// User is the resolver for the User field.
func (r *educationResolver) User(ctx context.Context, obj *model.Education) (*model.User, error) {
	var model *model.User
	return model, r.DB.First(&model, "id = ?", obj.UserID).Error
}

// CreateEducation is the resolver for the createEducation field.
func (r *mutationResolver) CreateEducation(ctx context.Context, input model.NewEducation) (string, error) {
	model := &model.Education{
		ID:          uuid.NewString(),
		UserID:      input.UserID,
		School:      input.School,
		Degree:      input.Degree,
		Field:       input.Field,
		Grade:       input.Grade,
		Activities:  input.Activities,
		Description: input.Description,
		StartYear:   input.StartYear,
		EndYear:     input.EndYear,
	}
	err := r.DB.Create(model).Error
	return "Ok", err
}

// UpdateEducation is the resolver for the updateEducation field.
func (r *mutationResolver) UpdateEducation(ctx context.Context, id string, input model.NewEducation) (string, error) {
	var model *model.Education

	if err := r.DB.First(&model, "id = ?", id).Error; err != nil {
		return "Error", err
	}
	model.Activities = input.Activities
	model.Degree = input.Degree
	model.Description = input.Description
	model.EndYear = input.EndYear
	model.Field = input.Field
	model.Grade = input.Grade
	model.School = input.School
	model.StartYear = input.StartYear

	return "Ok", r.DB.Save(model).Error
}

// DeleteEducation is the resolver for the deleteEducation field.
func (r *mutationResolver) DeleteEducation(ctx context.Context, id string) (string, error) {
	var model *model.Education
	if err := r.DB.First(&model, "id = ?", id).Error; err != nil {
		return "Error", err
	}
	return "Ok", r.DB.Delete(model).Error
}

// UserEducation is the resolver for the userEducation field.
func (r *queryResolver) UserEducation(ctx context.Context, userID string) ([]*model.Education, error) {
	var models []*model.Education
	return models, r.DB.Where("user_id = ?", userID).Find(&models).Error
}

// MyEducation is the resolver for the myEducation field.
func (r *queryResolver) MyEducation(ctx context.Context) ([]*model.Education, error) {
	val := *middleware.CtxValue(ctx)
	var models []*model.Education
	return models, r.DB.Where("user_id = ?", val.ID).Find(&models).Error
}

// Education returns generated.EducationResolver implementation.
func (r *Resolver) Education() generated.EducationResolver { return &educationResolver{r} }

type educationResolver struct{ *Resolver }
