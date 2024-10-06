import { useRouter } from "next/router";
import secureLocalStorage from "react-secure-storage";

export function encrypt(info){
    secureLocalStorage.clear()
    const sessionInfo = {data:info, stampTime:new Date()}
    secureLocalStorage.setItem('sessionInfo' , sessionInfo) 
}


// decrypt saved data in secure local storage
// let decryptedData = secureLocalStorage.getItem('sessionInfo')

export let today = new Date();
// let dd = String(today.getDate()).padStart(2, '0');
// let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
// let yyyy = today.getFullYear();
// today = `${mm}/${dd}/${yyyy}`



