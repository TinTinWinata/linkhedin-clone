package model

import "github.com/lib/pq"

type User struct {
	ID                string         `json:"id" gorm:"primaryKey;autoIncrement"`
	Name              string         `json:"name"`
	Email             string         `json:"email"`
	Password          string         `json:"password"`
	Validate          bool           `json:"validate"`
	FollowedUser      pq.StringArray `json:"followed_user" gorm:"type:text[]"`
	RequestConnect    pq.StringArray `json:"request_connect" gorm:"type:text[]"`
	RequestConnectTxt pq.StringArray `json:"request_connect_txt" gorm:"type:text[]"`
	ConnectedUser     pq.StringArray `json:"connected_user" gorm:"type:text[]"`
	PhotoProfile      string         `json:"photo_profile"`
	Headline          string         `json:"headline"`
	ProfileViews      int            `json:"profile_views"`
	BgPhotoProfile    string         `json:"bg_photo_profile"`
	FirstName         string         `json:"first_name"`
	LastName          string         `json:"last_name"`
	AdditionalName    string         `json:"additional_name"`
	Gender            string         `json:"gender"`
}
