package graph

import (
	"github.com/TinTinWinata/gqlgen/graph/model"
	"gorm.io/gorm"
)

//go:generate go run github.com/99designs/gqlgen generate

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	UsersArray []*model.User
	DB         *gorm.DB
}
