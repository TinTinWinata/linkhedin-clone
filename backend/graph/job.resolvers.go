package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"time"

	"github.com/TinTinWinata/gqlgen/graph/model"
	"github.com/google/uuid"
)

// CreateJob is the resolver for the createJob field.
func (r *mutationResolver) CreateJob(ctx context.Context, input model.JobInput) (string, error) {
	job := model.Job{
		CompanyName:  input.CompanyName,
		CreatedAt:    time.Now(),
		ID:           uuid.NewString(),
		Location:     input.Location,
		PhotoProfile: input.PhotoProfile,
		Title:        input.Title,
	}

	var users []*model.User
	err := r.DB.Find(&users).Error
	if err != nil {
		return "Error", err
	}

	for _, e := range users {
		notification := model.Notification{
			ID:             uuid.NewString(),
			UserID:         e.ID,
			Text:           job.CompanyName + " has a new offer for " + job.Title + "!",
			SenderName:     job.CompanyName,
			SenderPhotoUrl: "",
			Link:           "/job",
		}
		err = r.DB.Create(&notification).Error
		if err != nil {
			return "Error", err
		}
	}
	return "Ok", r.DB.Create(&job).Error
}

// Jobs is the resolver for the jobs field.
func (r *queryResolver) Jobs(ctx context.Context) ([]*model.Job, error) {
	var models []*model.Job
	return models, r.DB.Find(&models).Error
}
