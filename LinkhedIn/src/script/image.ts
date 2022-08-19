import { uuidv4 } from "@firebase/util";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";
import { toastError } from "../config/toast";



export function sendImage(img :any)
{
  const imageRef = ref(storage, `images/${img?.name}-${uuidv4()}`);
  return uploadBytes(imageRef, img)
    .then((resp) => {
      return getDownloadURL(imageRef)
    })
    .catch((err) => {
      toastError(err.message);
    });
}