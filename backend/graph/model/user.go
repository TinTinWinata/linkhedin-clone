package model

type User struct {
	ID       string `json:"id" gorm:"primaryKey;autoIncrement"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

