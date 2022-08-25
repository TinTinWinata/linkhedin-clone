package model

type Chat struct {
	ID        string `json:"id" gorm:"primaryKey"`
	ChatID    string `json:"chat_id"`
	UserID    string `json:"user_id"`
	ChatOrder int    `json:"chat_order" gorm:"autoIncrement"`
	Message   string `json:"message"`
	Link      string `json:"link"`
}
