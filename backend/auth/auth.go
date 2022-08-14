package auth

var jwtKey = []byte("my_secret_key")

type Credentials struct {
	Email    string `json:"username"`
	Password string `json:"password"`
}

// type Claims struct {
// 	Username string `json:"username`
// 	jwt.StandardClaims
// }

// func SignIn(){
// 	var cred Credentials
// 	err :=
// }
