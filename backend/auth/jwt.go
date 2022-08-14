package my_auth

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
)

type JWTCustomClaim struct {
	ID string `json:"id"`
	jwt.StandardClaims
}

var myJWTKey = []byte(GetJWTKey())

func GetJWTKey() string {
	key := os.Getenv("JWT_KEY")
	if key == "" {
		key = "TPAWEB221"
	}
	return key
}

func GenerateJWT(ctx context.Context, userID string) (string, error) {
	temp := jwt.NewWithClaims(jwt.SigningMethodHS256, &JWTCustomClaim{
		ID: userID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
			IssuedAt:  time.Now().Unix(),
		},
	})

	token, err := temp.SignedString(myJWTKey)
	if err != nil {
		return "", err
	}
	return token, nil
}

func ValidateJWT(ctx context.Context, token string) (*jwt.Token, error) {
	return jwt.ParseWithClaims(token, &JWTCustomClaim{}, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Can't sign-in")
		}
		return myJWTKey, nil
	})
}
