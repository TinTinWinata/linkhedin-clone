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

// CreateNotification is the resolver for the createNotification field.
func (r *mutationResolver) CreateNotification(ctx context.Context, input model.InputNotification) (string, error) {
	notification := model.Notification{
		ID:             uuid.NewString(),
		UserID:         input.UserID,
		Text:           input.Text,
		SenderName:     input.SenderName,
		SenderPhotoUrl: input.SenderPhotoURL,
		Link:           input.Link,
	}

	return "Ok", r.DB.Create(&notification).Error
}

// DeleteNotification is the resolver for the deleteNotification field.
func (r *mutationResolver) DeleteNotification(ctx context.Context, id string) (string, error) {
	var model *model.Notification

	if err := r.DB.First(&model, "id = ?", id).Error; err != nil {
		return "Error", err
	}

	return "Ok", r.DB.Delete(model).Error
}

// User is the resolver for the user field.
func (r *notificationResolver) User(ctx context.Context, obj *model.Notification) (*model.User, error) {
	var model *model.User
	return model, r.DB.First(&model, "id = ?", obj.UserID).Error
}

// MyNotification is the resolver for the myNotification field.
func (r *queryResolver) MyNotification(ctx context.Context) ([]*model.Notification, error) {
	val := *middleware.CtxValue(ctx)
	var notification []*model.Notification
	return notification, r.DB.Find(&notification, "user_id = ?", val.ID).Error
}

// Notification returns generated.NotificationResolver implementation.
func (r *Resolver) Notification() generated.NotificationResolver { return &notificationResolver{r} }

type notificationResolver struct{ *Resolver }
