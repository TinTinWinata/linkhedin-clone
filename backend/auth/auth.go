package my_auth

import (
	"context"
	"errors"

	"github.com/TinTinWinata/gqlgen/graph/model"
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

	// verification := &model.UserValidation{
	// 	ID:     uuid.New().String(),
	// 	Link:   uuid.New().String(),
	// 	UserID: createdUser.ID,
	// }

	// db := database.GetDB()
	// err = db.Create(verification).Error

	if err != nil {
		return nil, err
	}

	// mail.SendVerification(verification.Link)

	return map[string]interface{}{
		"token": token,
		"name":  createdUser.Name,
		"email": createdUser.Email,
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

	return map[string]interface{}{
		"id":            user.ID,
		"token":         token,
		"followed_user": user.FollowedUser,
		"name":          user.Name,
		"email":         user.Email,
	}, nil
}
