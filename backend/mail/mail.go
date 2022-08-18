package mail

import (
	"log"

	"gopkg.in/gomail.v2"
)

const CONFIG_SMTP_HOST = "smtp.gmail.com"
const CONFIG_SMTP_PORT = 587
const CONFIG_SENDER_NAME = "LinkhedIn <bluejackslc221@gmail.com>"
const CONFIG_AUTH_EMAIL = "tintin6892@gmail.com"
const CONFIG_AUTH_PASSWORD = "hymswknyomqamnys"

func SendVerification(link string) {
	mailer := gomail.NewMessage()
	mailer.SetHeader("From", CONFIG_SENDER_NAME)
	mailer.SetHeader("To", "tintin6892@gmail.com")
	mailer.SetHeader("Subject", "LinkhedIn Verification")
	body := "This is your verification link for LinkhedIn acccount" + link
	mailer.SetBody("text/html", body)

	dialer := gomail.NewDialer(
		CONFIG_SMTP_HOST,
		CONFIG_SMTP_PORT,
		CONFIG_AUTH_EMAIL,
		CONFIG_AUTH_PASSWORD,
	)

	err := dialer.DialAndSend(mailer)
	if err != nil {
		log.Fatal(err.Error())
	}

	log.Println("Mail sent!")
}
