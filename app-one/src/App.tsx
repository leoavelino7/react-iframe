import { useEffect } from "react";
import "./styles.css";

function App() {
  useEffect(() => {
    const iframeElement = document.getElementById(
      "iframe-app-two"
    ) as HTMLIFrameElement;

    if (iframeElement) {
      const iframeContentWindow = iframeElement.contentWindow;
      const sendMessage = (e: MessageEvent) => {
        const { data } = e;

        if (data.pageLoaded) {
          iframeContentWindow?.postMessage(
            {
              token: "<<my-token>>", // Comment here
            },
            "*"
          );
        }
      };

      window.addEventListener("message", sendMessage, false);

      return () => {
        window.removeEventListener("message", sendMessage);
      };
    }
  }, []);

  return (
    <div>
      <h1>App One</h1>

      <iframe
        id="iframe-app-two"
        name="iframe-app-two"
        src="http://localhost:5174"
        width="100%"
        height="100%"
      />
    </div>
  );
}

export default App;
