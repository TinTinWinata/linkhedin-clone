package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/TinTinWinata/gqlgen/graph/model"
	"github.com/TinTinWinata/gqlgen/helper"
	middleware "github.com/TinTinWinata/gqlgen/middlewares"
)

// CreateRequest is the resolver for the createRequest field.
func (r *mutationResolver) CreateRequest(ctx context.Context, userID string) (string, error) {
	val := *middleware.CtxValue(ctx)
	var user *model.User
	err := r.DB.First(&user, "id = ?", val.ID).Error
	if err != nil {
		return "Error", err
	}

	var getUser *model.User
	err = r.DB.First(&getUser, "id = ?", userID).Error
	if err != nil {
		return "Error", err
	}
	getUser.RequestConnect = append(getUser.RequestConnect, user.ID)
	return "Ok", r.DB.Save(getUser).Error
}

// AcceptRequest is the resolver for the acceptRequest field.
func (r *mutationResolver) AcceptRequest(ctx context.Context, id string) (string, error) {
	val := *middleware.CtxValue(ctx)
	var user *model.User
	err := r.DB.First(&user, "id = ?", val.ID).Error
	if err != nil {
		return "Error", err
	}

	var getUser *model.User
	err = r.DB.First(&getUser, "id = ?", id).Error
	if err != nil {
		return "Error", err
	}

	// User -> Yang Accept Request
	// Get User -> Yang Diaccept Requestnya

	// REMOVING CONNECT_REQUEST
	for i, val := range user.RequestConnect {
		if val == getUser.ID {
			user.RequestConnect = helper.RemoveArrayByIndex(user.RequestConnect, i)
		}
	}

	// ADD CONNECTED_USER
	user.ConnectedUser = append(user.ConnectedUser, getUser.ID)
	getUser.ConnectedUser = append(getUser.ConnectedUser, user.ID)

	err = r.DB.Save(getUser).Error
	if err != nil {
		return "Error", err
	}

	err = r.DB.Save(user).Error
	if err != nil {
		return "Error", err
	}

	return "Ok", nil
}

// DeclineRequest is the resolver for the declineRequest field.
func (r *mutationResolver) DeclineRequest(ctx context.Context, id string) (string, error) {
	val := *middleware.CtxValue(ctx)
	var user *model.User
	err := r.DB.First(&user, "id = ?", val.ID).Error
	if err != nil {
		return "Error", err
	}

	var getUser *model.User
	err = r.DB.First(&getUser, "id = ?", id).Error
	if err != nil {
		return "Error", err
	}

	// User -> Yang Decline Request
	// Get User -> Yang Di Decline Requestnya

	// REMOVING CONNECT_REQUEST
	for i, val := range user.RequestConnect {
		if val == getUser.ID {
			user.RequestConnect = helper.RemoveArrayByIndex(user.RequestConnect, i)
		}
	}

	err = r.DB.Save(getUser).Error
	if err != nil {
		return "Error", err
	}

	err = r.DB.Save(user).Error
	if err != nil {
		return "Error", err
	}

	return "Ok", nil
}
