package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"errors"

	my_auth "github.com/TinTinWinata/gqlgen/auth"
	"github.com/TinTinWinata/gqlgen/graph/generated"
	"github.com/TinTinWinata/gqlgen/graph/model"
	"github.com/TinTinWinata/gqlgen/helper"
	"github.com/TinTinWinata/gqlgen/mail"
	middleware "github.com/TinTinWinata/gqlgen/middlewares"
	"github.com/google/uuid"
)

// UpdateUserWithID is the resolver for the updateUserWithId field.
func (r *mutationResolver) UpdateUserWithID(ctx context.Context, id string, input model.AllUpdateUser) (string, error) {
	var user *model.User
	err := r.DB.First(&user, "id = ?", id).Error
	if err != nil {
		return "Error", err
	}

	user.AdditionalName = input.AdditionalName
	user.FirstName = input.FirstName
	user.LastName = input.LastName
	user.Headline = input.Headline
	user.Gender = input.Gender

	return "Ok", r.DB.Save(&user).Error
}

// BlockUser is the resolver for the blockUser field.
func (r *mutationResolver) BlockUser(ctx context.Context, id string) (string, error) {
	val := *middleware.CtxValue(ctx)
	var user *model.User
	err := r.DB.First(&user, "id = ?", val.ID).Error
	if err != nil {
		return "error", err
	}

	// Check already exists or no
	for idx, el := range user.BlockedUser {
		if string(el) == string(id) {
			// Already Exists
			user.BlockedUser = helper.RemoveArrayByIndex(user.BlockedUser, idx)
			return "Succesfully unblock user", r.DB.Save(&user).Error
		}
	}

	user.BlockedUser = append(user.BlockedUser, id)
	return "Succesfully blocked user", r.DB.Save(&user).Error
}

// ProfileSeen is the resolver for the profileSeen field.
func (r *mutationResolver) ProfileSeen(ctx context.Context, id string) (string, error) {
	var model *model.User
	err := r.DB.First(&model, "id = ?", id).Error
	if err != nil {
		return "Error", err
	}
	model.ProfileViews = model.ProfileViews + 1
	return "Ok", r.DB.Save(&model).Error
}

// RequestChangePassword is the resolver for the requestChangePassword field.
func (r *mutationResolver) RequestChangePassword(ctx context.Context, email string) (string, error) {
	var user *model.User
	err := r.DB.First(&user, "email = ?", email).Error
	if err != nil {
		return "Error", err
	}
	passwordRequest := &model.ChangePasswordRequest{
		ID:     uuid.NewString(),
		Email:  user.Email,
		IsUsed: false,
	}
	err = r.DB.Create(passwordRequest).Error
	if err != nil {
		return "Error", err
	}
	link := "http://localhost:5173/change-password/" + passwordRequest.ID
	mail.SendPasswordRequest(link, passwordRequest.Email)
	return "Ok", nil
}

// ChangePassword is the resolver for the changePassword field.
func (r *mutationResolver) ChangePassword(ctx context.Context, password string, id string) (string, error) {
	var request *model.ChangePasswordRequest
	err := r.DB.First(&request, "id = ?", id).Error
	if err != nil {
		return "Code Not Valid", err
	}

	if request.IsUsed {
		return "Error", errors.New("You already change the password")
	}

	var user *model.User
	err = r.DB.First(&user, "email = ?", request.Email).Error
	if err != nil {
		return "User not found", err
	}

	user.Password = my_auth.HashPassword(password)
	err = r.DB.Save(user).Error
	if err != nil {
		return "Failed to update user", err
	}

	request.IsUsed = true
	err = r.DB.Save(request).Error
	if err != nil {
		return "Failed to   request", err
	}

	return "Change Password Succed!", nil
}

// Follow is the resolver for the follow field.
func (r *mutationResolver) Follow(ctx context.Context, id string) (string, error) {
	val := *middleware.CtxValue(ctx)
	var user *model.User
	err := r.DB.First(&user, "id = ?", val.ID).Error
	if err != nil {
		return "Not Found", err
	}

	var getUser *model.User
	err = r.DB.First(&getUser, "id = ?", id).Error
	if err != nil {
		return "Not Found", err
	}

	for i, val := range user.FollowedUser {
		if val == getUser.ID {
			// Found
			user.FollowedUser = helper.RemoveArrayByIndex(user.FollowedUser, i)
			return "Removed", r.DB.Save(user).Error
		}
	}
	// Not Found
	user.FollowedUser = append(user.FollowedUser, getUser.ID)
	return "Added", r.DB.Save(user).Error
}

// ValidateUser is the resolver for the validateUser field.
func (r *mutationResolver) ValidateUser(ctx context.Context, id string) (string, error) {
	var validation *model.UserValidation

	if err := r.DB.First(&validation, "id = ?", id).Error; err != nil {
		return "Not Found", err
	}

	var user *model.User

	if err := r.DB.First(&user, "id = ?", validation.UserID).Error; err != nil {
		return "Not Found", err
	}

	user.Validate = true
	return "Success Validating User!", r.DB.Save(user).Error
}

// ValidateUserWithEmail is the resolver for the validateUserWithEmail field.
func (r *mutationResolver) ValidateUserWithEmail(ctx context.Context, email string) (string, error) {
	var user *model.User
	if err := r.DB.First(&user, "email = ?", email).Error; err != nil {
		return "Not Found", err
	}

	user.Validate = true
	return "Success Validating User!", r.DB.Save(user).Error
}

// Login is the resolver for the login field.
func (r *mutationResolver) Login(ctx context.Context, email string, password string) (interface{}, error) {
	return my_auth.UserLogin(ctx, email, password)
}

// Register is the resolver for the register field.
func (r *mutationResolver) Register(ctx context.Context, input model.NewUser) (interface{}, error) {
	return my_auth.UserRegister(ctx, input)
}

// CreateUser is the resolver for the createUser field.
func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (*model.User, error) {
	model := &model.User{
		Name:     input.Name,
		Email:    input.Email,
		Password: input.Password,
	}

	err := r.DB.Create(model).Error
	return model, err
}

// UpdateMyUser is the resolver for the updateMyUser field.
func (r *mutationResolver) UpdateMyUser(ctx context.Context, input model.AllUpdateUser) (string, error) {
	val := *middleware.CtxValue(ctx)
	var user *model.User
	err := r.DB.First(&user, "id = ?", val.ID).Error
	if err != nil {
		return "Error", err
	}

	user.AdditionalName = input.AdditionalName
	user.FirstName = input.FirstName
	user.LastName = input.LastName
	user.Headline = input.Headline
	user.Gender = input.Gender

	return "Ok", r.DB.Save(&user).Error
}

// UpdateUser is the resolver for the updateUser field.
func (r *mutationResolver) UpdateUser(ctx context.Context, id string, input model.UpdateUser) (*model.User, error) {
	var model *model.User

	if err := r.DB.First(&model, "id = ?", id).Error; err != nil {
		return nil, err
	}

	if input.BgPhotoProfile != "" {
		model.BgPhotoProfile = input.BgPhotoProfile
	}

	if input.Email != "" {
		model.Email = input.Email
	}

	if input.Headline != "" {
		model.Headline = input.Headline
	}
	if input.Name != "" {
		model.Name = input.Name
	}
	if input.PhotoProfile != "" {
		model.PhotoProfile = input.PhotoProfile
	}

	return model, r.DB.Save(model).Error
}

// DeleteUser is the resolver for the deleteUser field.
func (r *mutationResolver) DeleteUser(ctx context.Context, id string) (*model.User, error) {
	var model *model.User

	if err := r.DB.First(&model, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return model, r.DB.Delete(model).Error
}

// SearchConnected is the resolver for the searchConnected field.
func (r *queryResolver) SearchConnected(ctx context.Context) ([]*model.User, error) {
	val := *middleware.CtxValue(ctx)
	var connectedUser []*model.User
	r.DB.Raw("select * from users where cast(users.id as text) = any (select  unnest(u.connected_user) as connected from users u where u.id = ?)", val.ID).Scan(&connectedUser)
	return connectedUser, nil
}

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context, id string) (*model.User, error) {
	val := *middleware.CtxValue(ctx)

	var user *model.User

	if helper.IsDigit(id) {
		err := r.DB.First(&user, "id = ?", id).Error
		if err != nil {
			return nil, err
		}
	} else {
		err := r.DB.First(&user, "name = ?", id).Error
		if err != nil {
			return nil, err
		}
	}

	if string(val.ID) != string(user.ID) {
		// User Increment Profile View
		user.ProfileViews = user.ProfileViews + 1

		// Get Current Authenticated User
		var currUser *model.User
		err := r.DB.First(&currUser, "id = ?", val.ID).Error
		if err != nil {
			return nil, err
		}

		// Create Notification for seen user

		notification := model.Notification{
			ID:             uuid.NewString(),
			UserID:         user.ID,
			Text:           currUser.Name + " viewed your profile",
			SenderName:     currUser.Name,
			SenderPhotoUrl: currUser.PhotoProfile,
			Link:           "/profile/" + currUser.ID,
		}
		err = r.DB.Create(&notification).Error
		if err != nil {
			return nil, err
		}
	}
	return user, r.DB.Save(&user).Error
}

// Users is the resolver for the Users field.
func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	var models []*model.User
	return models, r.DB.Find(&models).Error
}

// Whoisme is the resolver for the whoisme field.
func (r *queryResolver) Whoisme(ctx context.Context) (*model.User, error) {
	val := *middleware.CtxValue(ctx)
	var user *model.User
	err := r.DB.First(&user, "id = ?", val.ID).Error
	if err != nil {
		return nil, err
	}
	return user, nil
}

// UserSuggestion is the resolver for the userSuggestion field.
func (r *queryResolver) UserSuggestion(ctx context.Context) ([]*model.User, error) {
	val := *middleware.CtxValue(ctx)
	var user *model.User
	err := r.DB.First(&user, "id = ?", val.ID).Error
	if err != nil {
		return nil, err
	}
	var models []*model.User
	r.DB.Raw("select * from users where cast(users.id as text) = any (select unnest(users.connected_user) from users where cast(users.id as text) = any (select unnest(u.connected_user) from users u where u.id = ?)) and users.id != ?", val.ID, val.ID).Scan(&models)
	return models, nil
}

// FollowedUser is the resolver for the FollowedUser field.
func (r *userResolver) FollowedUser(ctx context.Context, obj *model.User) ([]string, error) {
	return obj.FollowedUser, nil
}

// ConnectedUser is the resolver for the ConnectedUser field.
func (r *userResolver) ConnectedUser(ctx context.Context, obj *model.User) ([]string, error) {
	return obj.ConnectedUser, nil
}

// RequestConnect is the resolver for the RequestConnect field.
func (r *userResolver) RequestConnect(ctx context.Context, obj *model.User) ([]string, error) {
	return obj.RequestConnect, nil
}

// RequestConnectTxt is the resolver for the RequestConnectTxt field.
func (r *userResolver) RequestConnectTxt(ctx context.Context, obj *model.User) ([]string, error) {
	return obj.RequestConnectTxt, nil
}

// BlockedUser is the resolver for the BlockedUser field.
func (r *userResolver) BlockedUser(ctx context.Context, obj *model.User) ([]string, error) {
	return obj.BlockedUser, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type userResolver struct{ *Resolver }
