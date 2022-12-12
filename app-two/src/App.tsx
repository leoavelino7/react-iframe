import { Fragment, useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState<null | string>(null);

  useEffect(() => {
    const receiveMessage = (e: MessageEvent) => {
      const { data } = e;
      console.log("receive youdata", data);

      if(data.token) setToken(data.token);
    };

    window.addEventListener("message", receiveMessage, false);

    // after register listen function send this message to page A.
    window.parent.postMessage({ pageLoaded: true }, "*");

    return () => {
      window.removeEventListener("message", receiveMessage);
    };
  }, []);

  if(!token) return <Fragment />

  return (
    <div>
      <h1>App Two</h1>
    </div>
  );
}

export default App;
