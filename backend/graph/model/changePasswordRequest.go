package model

type ChangePasswordRequest struct {
	ID    string `json:"id"`
	Email string `json:"email"`
}
