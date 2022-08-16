package model

import "time"

type Experiencce struct {
	ID          string    `json:"id" gorm:"primaryKey"`
	UserID      string    `json:"user_id"`
	School      string    `json:"school"`
	Degree      string    `json:"degree"`
	Field       string    `json:"field"`
	Grade       float32   `json:"grade"`
	Activities  string    `json:"activites"`
	Description string    `json:"description"`
	StartDate   time.Time `json:"start_date"`
	EndDate     time.Time `json:"end_date"`
}
