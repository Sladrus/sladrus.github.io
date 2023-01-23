import { addMessage } from "../../http/chatApi";

async function handlePrivateMessages(event, chat, requests, senders) {
  const message = event.message;
  if (message.isPrivate) {
    const sender = await message.getSender();
    const res = chat.senders.find(
      (obj) => obj.senderId === sender.id.value.toString()
    );
    if (res) {
      const messages = await addMessage(res._id, {
        message: message.text,
        my: false,
      });
      res.messages = messages
    }

    // update.push(message.text);
  }
}

export default handlePrivateMessages;
