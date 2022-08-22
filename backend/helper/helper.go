package helper

import "math/rand"

func StringContains(s []string, e string) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}

func RemoveArrayByIndex(slice []string, s int) []string {
	return append(slice[:s], slice[s+1:]...)
}

func IsDigit(str string) bool {
	digit := [10]string{"0", "1", "2", "3", "4", "5", "6", "7", "8", "9"}
	for _, el := range str {
		for _, elD := range digit {
			if string(el) == elD {
				return true
			}
		}
	}
	return false
}

func RandStringRunes(n int) string {
	var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890")
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}
