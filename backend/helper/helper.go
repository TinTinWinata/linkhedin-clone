package helper

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
