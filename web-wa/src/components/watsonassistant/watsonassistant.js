import React from "react";


export default function WatsonAssistant(props) {
  return (
    <div className="watsonassistant" >
       <script>
            {/* window.watsonAssistantChatOptions = {
                integrationID: "8f92ab65-c826-4f2d-818b-de024efb4aca", // The ID of this integration.
                region: "us-south", // The region your integration is hosted in.
                serviceInstanceID: "d9030299-9c39-4b9e-ab62-dd37cd614594", // The ID of your service instance.
                onLoad: async (instance) => { await instance.render(); }
            };
            setTimeout(function(){
                const t=document.createElement('script');
                t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
                document.head.appendChild(t);
            }); */}
        </script>
    </div>
  );
}
