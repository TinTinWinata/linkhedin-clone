package model

import "time"

type Job struct {
	ID           string    `json:"id"`
	Title        string    `json:"name"`
	CompanyName  string    `json:"company_name"`
	Location     string    `json:"location"`
	CreatedAt    time.Time `json:"created_at"`
	PhotoProfile string    `json:"photo_profile"`
}
