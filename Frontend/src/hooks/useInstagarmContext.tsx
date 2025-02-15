import axios from "axios";
import { useEffect, useState } from "react";

export function useInstagramContext() {
  const [contents, setContents] = useState([]);

  function fetchagaintoBackend() {
    axios.get('http://localhost:3000/api/v1/content', {
      headers: {
        "Authorization": localStorage.getItem('token')
      }
    })

      .then((response) => {

        setContents(response.data.allContent)
      })
  }

  useEffect(() => {
    // const intervalId = setInterval(fetchagaintoBackend, 2000)

    // return () => {
    //   clearInterval(intervalId)
    // }
    fetchagaintoBackend()

  }, [])
  //@ts-ignore
  const filteredContents = contents.filter((content) => content.type === "instagram");

  return filteredContents;

}