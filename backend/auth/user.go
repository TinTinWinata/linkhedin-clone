package my_auth

import (
	"context"

	"github.com/TinTinWinata/gqlgen/database"
	"github.com/TinTinWinata/gqlgen/graph/model"
	// "github.com/google/uuid"
)

func UserCreate(ctx context.Context, newUser model.NewUser) (*model.User, error) {
	db := database.GetDB()
	newUser.Password = HashPassword(newUser.Password)
	var emptyArrString []string
	user := model.User{
		Name:           newUser.Name,
		Email:          newUser.Email,
		Password:       newUser.Password,
		Validate:       false,
		PhotoProfile:   "https://picsum.photos/id/237/200/300",
		RequestConnect: emptyArrString,
		FollowedUser:   emptyArrString,
		ConnectedUser:  emptyArrString,
		Headline:       "",
		ProfileViews:   0,
	}
	if err := db.Model(user).Create(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func UserGetByID(ctx context.Context, id string) (*model.User, error) {
	db := database.GetDB()
	var user model.User
	if err := db.Model(user).Where("id = ?", id).Take(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func UserGetByEmail(ctx context.Context, email string) (*model.User, error) {
	db := database.GetDB()
	var user model.User
	if err := db.Model(user).Where("email LIKE ?", email).Take(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}
