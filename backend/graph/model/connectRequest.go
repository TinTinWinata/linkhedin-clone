package model

import "time"

type ConnectRequest struct {
	ID          string    `json:"id" gorm:"primaryKey"`
	UserTo      string    `json:"user_to"`
	UserFrom    string    `json:"user_from"`
	IsAccepted  bool      `json:"is_accepted:"`
	Text        string    `json:"text"`
	CreatedDate time.Time `json:"created_at"`
}
