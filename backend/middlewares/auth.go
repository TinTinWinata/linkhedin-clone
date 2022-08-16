package middleware

import (
	"context"
	"net/http"

	my_auth "github.com/TinTinWinata/gqlgen/auth"
)

type AuthString string

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		auth := r.Header.Get("Authorization")

		if auth == "" {
			next.ServeHTTP(w, r)
			return
		}

		bearer := "Bearer "
		auth = auth[len(bearer):]

		validate, err := my_auth.ValidateJWT(context.Background(), auth)
		if err != nil || !validate.Valid {
			http.Error(w, "Invalid Token", http.StatusForbidden)
			return
		}
		customClaim, _ := validate.Claims.(*my_auth.JWTCustomClaim)

		var ctx context.Context
		ctx = context.WithValue(r.Context(), AuthString("auth"), customClaim)

		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}

func CtxValue(ctx context.Context) *my_auth.JWTCustomClaim {
	raw, _ := ctx.Value(AuthString("auth")).(*my_auth.JWTCustomClaim)
	return raw
}
