package my_auth

import (
	"context"
	"errors"
	"fmt"

	"github.com/TinTinWinata/gqlgen/database"
	"github.com/TinTinWinata/gqlgen/graph/model"
	"github.com/TinTinWinata/gqlgen/mail"
	"github.com/google/uuid"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"gorm.io/gorm"
)

func UserRegister(ctx context.Context, newUser model.NewUser) (interface{}, error) {

	_, err := UserGetByEmail(ctx, newUser.Email)

	if err == nil {
		if err != gorm.ErrRecordNotFound {
			return nil, err
		}
	}

	createdUser, err := UserCreate(ctx, newUser)

	if err != nil {
		return nil, err
	}
	token, err := GenerateJWT(ctx, createdUser.ID)
	if err != nil {
		return nil, err
	}

	newId := uuid.New().String()

	verification := &model.UserValidation{
		ID:     newId,
		Link:   "http://localhost:5173/verification/" + newId,
		UserID: createdUser.ID,
	}

	db := database.GetDB()
	err = db.Create(verification).Error

	if err != nil {
		return nil, err
	}

	mail.SendVerification(verification.Link, createdUser.Email)

	return map[string]interface{}{
		"id":             createdUser.ID,
		"token":          token,
		"name":           createdUser.Name,
		"email":          createdUser.Email,
		"PhotoProfile":   createdUser.PhotoProfile,
		"FollowedUser":   createdUser.FollowedUser,
		"RequestConnect": createdUser.RequestConnect,
		"BgPhotoProfile": createdUser.BgPhotoProfile,
	}, nil
}

func UserLogin(ctx context.Context, email string, password string) (interface{}, error) {
	user, err := UserGetByEmail(ctx, email)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, &gqlerror.Error{
				Message: "Email Not Found",
			}
		}
		return nil, err
	}
	if user.Validate == false {
		return nil, errors.New("Your account is not authenticated!")
	}
	if err := ComparePassword(user.Password, password); err != nil {
		return nil, err
	}
	token, err := GenerateJWT(ctx, user.ID)
	if err != nil {
		return nil, err
	}
	fmt.Println(user.BgPhotoProfile)
	return map[string]interface{}{
		"id":             user.ID,
		"token":          token,
		"name":           user.Name,
		"email":          user.Email,
		"PhotoProfile":   user.PhotoProfile,
		"FollowedUser":   user.FollowedUser,
		"RequestConnect": user.RequestConnect,
		"BgPhotoProfile": user.BgPhotoProfile,
	}, nil
}

func UserLoginWithoutPassword(ctx context.Context, email string) (interface{}, error) {
	user, err := UserGetByEmail(ctx, email)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, &gqlerror.Error{
				Message: "Email Not Found",
			}
		}
		return nil, err
	}

	if user.Validate == false {
		return nil, errors.New("Your account is not authenticated!")
	}

	token, err := GenerateJWT(ctx, user.ID)
	if err != nil {
		return nil, err
	}

	return map[string]interface{}{
		"id":             user.ID,
		"token":          token,
		"name":           user.Name,
		"email":          user.Email,
		"PhotoProfile":   user.PhotoProfile,
		"FollowedUser":   user.FollowedUser,
		"RequestConnect": user.RequestConnect,
		"Headline":       user.Headline,
		"ProfileViews":   user.ProfileViews,
		"BgPhotoProfile": user.BgPhotoProfile,
	}, nil
}
