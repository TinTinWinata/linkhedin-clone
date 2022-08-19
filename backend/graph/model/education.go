package model

type Education struct {
	ID          string  `json:"id" gorm:"primaryKey"`
	UserID      string  `json:"user_id"`
	School      string  `json:"school"`
	Degree      string  `json:"degree"`
	Field       string  `json:"field"`
	Grade       float64 `json:"grade"`
	Activities  string  `json:"activites"`
	Description string  `json:"description"`
	StartYear   string  `json:"start_date"`
	EndYear     string  `json:"end_date"`
}
