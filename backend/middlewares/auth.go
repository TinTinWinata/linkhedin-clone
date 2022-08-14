package middleware

import (
	"context"
	"net/http"

	my_auth "github.com/TinTinWinata/gqlgen/auth"
)

type authString string

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

		ctx := context.WithValue(r.Context(), authString("auth"), customClaim)

		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}

func CtxValue(ctx context.Context) *my_auth.JWTCustomClaim {
	raw, _ := ctx.Value(authString("auth")).(*my_auth.JWTCustomClaim)
	return raw
}
