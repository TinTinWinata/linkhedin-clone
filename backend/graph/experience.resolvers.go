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
func (r *experienceResolver) User(ctx context.Context, obj *model.Experience) (*model.User, error) {
	var model *model.User
	return model, r.DB.First(&model, "id = ?", obj.UserID).Error
}

// CreateExperience is the resolver for the createExperience field.
func (r *mutationResolver) CreateExperience(ctx context.Context, input model.NewExperience) (string, error) {
	model := &model.Experience{
		ID:             uuid.NewString(),
		UserID:         input.UserID,
		Title:          input.Title,
		EmploymentType: input.EmploymentType,
		CompanyName:    input.CompanyName,
		Location:       input.Location,
		IsActive:       input.IsActive,
		Industry:       input.Industry,
		Headline:       input.Headline,
		StartYear:      input.StartYear,
		EndYear:        input.EndYear,
	}
	err := r.DB.Create(model).Error
	return "Ok", err
}

// UpdateExperience is the resolver for the updateExperience field.
func (r *mutationResolver) UpdateExperience(ctx context.Context, id string, input model.NewExperience) (string, error) {
	var model *model.Experience

	if err := r.DB.First(&model, "id = ?", id).Error; err != nil {
		return "Error", err
	}
	model.CompanyName = input.CompanyName
	model.EmploymentType = input.EmploymentType
	model.EndYear = input.EndYear
	model.Headline = input.Headline
	model.Industry = input.Industry
	model.IsActive = input.IsActive
	model.Location = input.Location
	model.Title = input.Title
	model.StartYear = input.StartYear

	return "Ok", r.DB.Save(model).Error
}

// DeleteExperience is the resolver for the deleteExperience field.
func (r *mutationResolver) DeleteExperience(ctx context.Context, id string) (string, error) {
	var model *model.Experience
	if err := r.DB.First(&model, "id = ?", id).Error; err != nil {
		return "Error", err
	}
	return "Ok", r.DB.Delete(model).Error
}

// UserExperience is the resolver for the userExperience field.
func (r *queryResolver) UserExperience(ctx context.Context, id string) ([]*model.Experience, error) {
	var models []*model.Experience
	return models, r.DB.Where("user_id = ?", id).Find(&models).Error
}

// MyExperience is the resolver for the myExperience field.
func (r *queryResolver) MyExperience(ctx context.Context) ([]*model.Experience, error) {
	val := *middleware.CtxValue(ctx)
	var models []*model.Experience
	return models, r.DB.Where("user_id = ?", val.ID).Find(&models).Error
}

// Experience returns generated.ExperienceResolver implementation.
func (r *Resolver) Experience() generated.ExperienceResolver { return &experienceResolver{r} }

type experienceResolver struct{ *Resolver }
