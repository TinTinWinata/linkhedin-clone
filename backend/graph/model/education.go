package model

import "time"

type Education struct {
	ID             string    `json:"id" gorm:"primaryKey"`
	UserID         string    `json:"user_id"`
	Title          string    `json:"title"`
	EmploymentType string    `json:"type"`
	CompanyName    string    `json:"name"`
	Location       string    `json:"location"`
	IsActive       string    `json:"is_active"`
	StartDate      time.Time `json:"start_date"`
	EndDate        time.Time `json:"end_date"`
	Industry       string    `json:"industry"`
	Headline       string    `json:"headline"`
}
