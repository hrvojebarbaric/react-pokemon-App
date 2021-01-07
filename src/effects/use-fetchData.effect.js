import {useState, useEffect} from "react"
import Axios from "axios";

export const UsefetchData = (url, setIsLoaded, setNumberOfPages) => {
    const [data, setData] = useState(null)
    useEffect(()=>{
        setIsLoaded(true)
        const ourRequest = Axios.CancelToken.source()    
        const loadData = async() => {
            await Axios.get(url, {
                cancelToken: ourRequest.token
            }).then(function (response) {
                // handle success                
                setData(response.data)
                //set number of pages and is only used on home page
                setNumberOfPages&&setNumberOfPages(Math.ceil(response.data.count/20))
                //turn off loader
                setIsLoaded(false)                          
            }).catch(function (thrown) {
                if (Axios.isCancel(thrown)) {
                    console.log('Request canceled', thrown.message);
                } else {
                    // handle error
                }
            });                          
        }        
        loadData()
        return () => { 
            ourRequest.cancel()
        }   
    },[url,setIsLoaded,setNumberOfPages])

    return data
}