import { toJS } from 'mobx';
import { addRequest, addSender } from '../../http/chatApi';

async function handleGroupMessages(event, chat, requests, senders) {
  const message = event.message;
  if (message.isGroup) {
    const sender = await message.getSender();
    if (sender?.bot) return;

    for (const key of chat.keys.list.split(',')) {
      if (message.text.toLowerCase().includes(key.toLowerCase().trim())) {
        const body = {
          text: message.text,
          sender: sender.id.value.toString(),
          username: sender.username ? '@' + sender.username : sender.firstName,
          date: message.date,
          chat: chat._id,
        };
        const request = await addRequest(body);
        chat.requests.push(request);
        requests.push(request);
        console.log(toJS(chat.senders));
        const res = chat.senders.find(
          (obj) => obj.senderId === sender.id.value.toString()
        );
        if (!res) {
          const senderBody = {
            username: sender.username ? '@' + sender.username : sender.firstName,
            senderId: sender.id.value.toString(),
            messages: [],
            chat: chat._id,
          };
          const data = await addSender(senderBody);
          console.log(data);
          chat.senders.push(data);
        }
        break;
      }
    }
  }
}

export default handleGroupMessages;
