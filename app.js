// endpoint: https://indodax.com/api/v2/chatroom/history
// save to: chatroom.json every 10 seconds

// {
//   "success": true,
//   "code": 200,
//   "message": "Chatroom connected",
//   "data": {
//       "content": [
//           {
//               "id": 45770751,
//               "username": "Irma_nurmalasari",
//               "content": "@Muhammad_Zealot ntr jual 7k ga tau kapan bntr lagi",
//               "timestamp": 1735955759,
//               "level": 3
//           },

// just save the data.content to chatroom.json

const axios = require('axios');
const fs = require('fs');

const endpoint = 'https://indodax.com/api/v2/chatroom/history';
const saveTo = 'chatroom.json';
const keyword = 'cukongindodax';

const saveChatroom = async () => {
  try {
    const response = await axios.get(endpoint, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0',
      },
    });
    const chatroom = response.data.data.content;

    let chatroomData = [];
    if (fs.existsSync(saveTo)) {
      const fileContent = fs.readFileSync(saveTo);
      if (fileContent.length > 0) {
        chatroomData = JSON.parse(fileContent);
      } else {
        chatroomData = [];
      }
    }

    chatroom.forEach((chat) => {
      const isExist = chatroomData.find(
        (data) => data.id === chat.id
      );

      if (!isExist && chat.content.toLowerCase().includes(keyword.toLowerCase())) {
        chatroomData.unshift(chat);
      }
    })

    fs.writeFileSync(saveTo, JSON.stringify(chatroomData, null, 2));

    console.log('Chatroom saved');
  } catch (error) {
    console.error(error);
  }
}

saveChatroom();
setInterval(saveChatroom, 10000);
