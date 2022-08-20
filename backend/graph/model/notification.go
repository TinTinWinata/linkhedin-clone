package model

type Notification struct {
	ID             string `json:"id"`
	UserID         string `json:"user_id"`
	Text           string `json:"text"`
	SenderName     string `json:"sender_name"`
	SenderPhotoUrl string `json:"sender_photo_url"`
	Link           string `json:"link"`
}
