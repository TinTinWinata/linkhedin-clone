package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/TinTinWinata/gqlgen/graph/generated"
	"github.com/TinTinWinata/gqlgen/graph/model"
	middleware "github.com/TinTinWinata/gqlgen/middlewares"
	"github.com/TinTinWinata/gqlgen/pusher"
	"github.com/google/uuid"
)

// User is the resolver for the User field.
func (r *chatResolver) User(ctx context.Context, obj *model.Chat) (*model.User, error) {
	var user *model.User
	return user, r.DB.First(&user, "id = ?", obj.UserID).Error
}

// Message is the resolver for the message field.
func (r *mutationResolver) Message(ctx context.Context, input model.Message) (string, error) {
	val := *middleware.CtxValue(ctx)
	var user *model.User
	err := r.DB.First(&user, "id = ?", val.ID).Error
	if err != nil {
		return "Error", err
	}
	var getUser *model.User
	err = r.DB.First(&getUser, "id = ?", input.UserID).Error
	if err != nil {
		return "Error", err
	}

	event := ""
	if input.UserID < val.ID {
		event += string(input.UserID) + string(val.ID)
	} else {
		event += string(val.ID) + string(input.UserID)
	}

	chat := &model.Chat{
		ID:      uuid.NewString(),
		ChatID:  event,
		UserID:  user.ID,
		Message: input.Message,
		Link:    input.Link,
	}

	err = r.DB.Create(chat).Error
	if err != nil {
		return "Error", err
	}

	fmt.Println(event)
	pusher.Pusher("message", event, input.Message, user.Name)
	return "Ok", nil
}

// GetAllMessage is the resolver for the getAllMessage field.
func (r *queryResolver) GetAllMessage(ctx context.Context, chatID string) ([]*model.Chat, error) {
	var models []*model.Chat
	return models, r.DB.Order("chat_order asc").Where("chat_id = ?", chatID).Find(&models).Error
}

// Chat returns generated.ChatResolver implementation.
func (r *Resolver) Chat() generated.ChatResolver { return &chatResolver{r} }

type chatResolver struct{ *Resolver }
