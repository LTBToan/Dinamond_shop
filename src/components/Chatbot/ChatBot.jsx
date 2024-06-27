import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    (function (d, t) {
      var v = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
      v.onload = function () {
        window.voiceflow.chat.load({
          verify: { projectID: "667a3e3d59567728fcbee8bb" },
          url: "https://general-runtime.voiceflow.com",
          versionID: "production",
        });
      };
      v.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
      v.type = "text/javascript";
      s.parentNode.insertBefore(v, s);
    })(document, "script");
  }, []);

  return null;
};

export default Chatbot;
