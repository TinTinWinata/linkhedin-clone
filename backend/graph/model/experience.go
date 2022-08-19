package model

type Experience struct {
	ID             string `json:"id" gorm:"primaryKey"`
	UserID         string `json:"user_id"`
	Title          string `json:"title"`
	EmploymentType string `json:"type"`
	CompanyName    string `json:"name"`
	Location       string `json:"location"`
	IsActive       string `json:"is_active"`
	StartYear      string `json:"start_date"`
	EndYear        string `json:"end_date"`
	Industry       string `json:"industry"`
	Headline       string `json:"headline"`
}
