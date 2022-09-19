package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/TinTinWinata/gqlgen/graph/model"
)

// SearchUser is the resolver for the searchUser field.
func (r *queryResolver) SearchUser(ctx context.Context, query string) ([]*model.User, error) {
	var models []*model.User
	query = "%" + query + "%"
	err := r.DB.Where("name like ?", query).Find(&models).Error
	return models, err
}

// SearchPost is the resolver for the searchPost field.
func (r *queryResolver) SearchPost(ctx context.Context, query string) ([]*model.Post, error) {
	var models []*model.Post
	query = "%" + query + "%"
	err := r.DB.Where("text like ?", query).Find(&models).Error
	return models, err
}

// Search is the resolver for the search field.
func (r *queryResolver) Search(ctx context.Context, query string) (*model.Search, error) {
	var search *model.Search
	var models []*model.User
	search = &model.Search{}
	query = "%" + query + "%"
	err := r.DB.Where("name like ?", query).Find(&models).Error

	search.User = models

	var posts []*model.Post
	query = "%" + query + "%"
	err = r.DB.Where("text like ?", query).Find(&posts).Error

	search.Post = posts
	return search, err
	// return models, err
}
