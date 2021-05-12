const ChatRoomInvite = (link) => {
  return `
      <!DOCTYPE html>
     <html style="margin: 0; padding: 0;">
     
         <head>
             <title>Hello</title>
         </head>
     
             <body style="margin: 0; padding: 0;">
                <br />
                <br />
                <div>This is the link from the new chatroom ${link}</div>
                <br />
                <br />
             </body>
     
       </html>
      `;
};

module.exports = { ChatRoomInvite };
