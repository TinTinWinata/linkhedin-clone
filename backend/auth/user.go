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
	user := model.User{
		// ID:       uuid.New().String(),
		Name:     newUser.Name,
		Email:    newUser.Email,
		Password: newUser.Password,
		Validate: false,
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
