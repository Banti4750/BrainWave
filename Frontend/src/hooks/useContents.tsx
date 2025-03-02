import axios from "axios";
import { useEffect, useState } from "react";

export function useContent() {
    const [contents, setContents] = useState([]);


    function fetchagaintoBackend() {
        axios.get('https://brainwave-jibt.onrender.com/api/v1/content', {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })

            .then((response) => {
                setContents(response.data.allContent)

            })
    }
    // function Searchfilter() {
    //      axios.get('http://localhost:3000/api/v1/search', {
    //         params: { filter },

    //     })
    // }

    useEffect(() => {
        // const intervalId = setInterval(fetchagaintoBackend, 2000)

        // return () => {
        //   clearInterval(intervalId)
        // }
        fetchagaintoBackend()


    }, [])

    return contents;
    // return { contents, refetch: fetchagaintoBackend }; // Expose refetch function
}