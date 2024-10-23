import React from "react";


export default function WatsonAssistant(props) {
  return (
    <div className="watsonassistant" >
       <script>
            {/* window.watsonAssistantChatOptions = {
                integrationID: "sd3sdfs-4326-4f2d-818b-ab345chd9egr", // The ID of this integration.
                region: "us-south", // The region your integration is hosted in.
                serviceInstanceID: "wwe23fsd-9c39-sdfsd-sdfs-dswewfs", // The ID of your service instance.
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
