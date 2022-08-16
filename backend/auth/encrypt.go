package my_auth

import "golang.org/x/crypto/bcrypt"

func HashPassword(s string) string {
	hashed, _ := bcrypt.GenerateFromPassword([]byte(s), bcrypt.DefaultCost)
	return string(hashed)
}

func ComparePassword(hashed string, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashed), []byte(password))
}
