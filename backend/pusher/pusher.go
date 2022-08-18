package pusher

import "github.com/pusher/pusher-http-go"

func Pusher(channel string, event string, message string, username string) {
	pusherClient := pusher.Client{
		AppID:   "1464299",
		Key:     "9e320ff2624435fef743",
		Secret:  "2f150d1096b1f77bf0a0",
		Cluster: "ap1",
		Secure:  true,
	}
	data := map[string]string{"message": message, "username": username}
	pusherClient.Trigger(channel, event, data)
}
