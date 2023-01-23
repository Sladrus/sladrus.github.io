import { makeAutoObservable } from 'mobx';
import { NewMessage } from 'telegram/events';
import { StringSession } from 'telegram/sessions';
import { deleteOne } from '../../http/accountApi';
import { linkToAccount, unlinkFromAccount } from '../../http/chatApi';
import handleGroupMessages from './handleGroupMessages';
import handlePrivateMessages from './handlePrivateMessages';
const { Api, TelegramClient } = require('telegram');

class TelegramService {
  constructor() {
    this.chats = [];
    this.senders = [];
    this.update = [];
    this.requests = [];
    this.proxyList = [
      {
        ip: '194.34.248.152',
        port: 3001,
        MTProxy: false,
        username: 'EcUF67',
        password: 'yJzWaRCDNC',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '185.181.244.150',
        port: 3001,
        MTProxy: false,
        username: 'EcUF67',
        password: 'yJzWaRCDNC',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '46.8.111.51',
        port: 3001,
        MTProxy: false,
        username: 'EcUF67',
        password: 'yJzWaRCDNC',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '109.248.48.41',
        port: 3001,
        MTProxy: false,
        username: 'EcUF67',
        password: 'yJzWaRCDNC',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '188.130.221.27',
        port: 3001,
        MTProxy: false,
        username: 'EcUF67',
        password: 'yJzWaRCDNC',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '213.226.101.121',
        port: 3001,
        MTProxy: false,
        username: 'EcUF67',
        password: 'yJzWaRCDNC',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '45.11.20.129',
        port: 3001,
        MTProxy: false,
        username: 'EcUF67',
        password: 'yJzWaRCDNC',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '95.182.125.184',
        port: 3001,
        MTProxy: false,
        username: 'EcUF67',
        password: 'yJzWaRCDNC',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '188.130.218.55',
        port: 3001,
        MTProxy: false,
        username: 'EcUF67',
        password: 'yJzWaRCDNC',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '45.86.0.115',
        port: 3001,
        MTProxy: false,
        username: 'EcUF67',
        password: 'yJzWaRCDNC',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '95.182.124.205',
        port: 3001,
        MTProxy: false,
        username: 'SciAnk',
        password: 'HF2fwDaubg',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '95.182.126.141',
        port: 3001,
        MTProxy: false,
        username: 'SciAnk',
        password: 'HF2fwDaubg',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '188.130.129.238',
        port: 3001,
        MTProxy: false,
        username: 'SciAnk',
        password: 'HF2fwDaubg',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '109.248.143.248',
        port: 3001,
        MTProxy: false,
        username: 'SciAnk',
        password: 'HF2fwDaubg',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '109.248.13.232',
        port: 3001,
        MTProxy: false,
        username: 'SciAnk',
        password: 'HF2fwDaubg',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '188.130.137.13',
        port: 3001,
        MTProxy: false,
        username: 'SciAnk',
        password: 'HF2fwDaubg',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '185.181.247.13',
        port: 3001,
        MTProxy: false,
        username: 'SciAnk',
        password: 'HF2fwDaubg',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '185.181.244.102',
        port: 3001,
        MTProxy: false,
        username: 'SciAnk',
        password: 'HF2fwDaubg',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '109.248.14.40',
        port: 3001,
        MTProxy: false,
        username: 'SciAnk',
        password: 'HF2fwDaubg',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '188.130.129.94',
        port: 3001,
        MTProxy: false,
        username: 'SciAnk',
        password: 'HF2fwDaubg',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '46.8.155.71',
        port: 3001,
        MTProxy: false,
        username: 'SciAnk',
        password: 'HF2fwDaubg',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '188.130.187.204',
        port: 3001,
        MTProxy: false,
        username: 'SciAnk',
        password: 'HF2fwDaubg',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '185.181.246.84',
        port: 3001,
        MTProxy: false,
        username: 'SciAnk',
        password: 'HF2fwDaubg',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '45.81.136.220',
        port: 3001,
        MTProxy: false,
        username: 'SciAnk',
        password: 'HF2fwDaubg',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '46.8.223.57',
        port: 3001,
        MTProxy: false,
        username: 'SciAnk',
        password: 'HF2fwDaubg',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '46.8.23.82',
        port: 3001,
        MTProxy: false,
        username: 'SciAnk',
        password: 'HF2fwDaubg',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '194.34.248.93',
        port: 3001,
        MTProxy: false,
        username: 'SciAnk',
        password: 'HF2fwDaubg',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '188.130.128.132',
        port: 3001,
        MTProxy: false,
        username: 'SciAnk',
        password: 'HF2fwDaubg',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '45.90.196.66',
        port: 3001,
        MTProxy: false,
        username: 'SciAnk',
        password: 'HF2fwDaubg',
        socksType: 5,
        timeout: 5,
      },
      {
        ip: '188.130.185.236',
        port: 3001,
        MTProxy: false,
        username: 'SciAnk',
        password: 'HF2fwDaubg',
        socksType: 5,
        timeout: 5,
      },
    ];
    makeAutoObservable(this);
  }

  async joinPrivateChat(client, hash, chat) {
    var result = {};
    try {
      const respCheckInvite = await client.invoke(
        new Api.messages.CheckChatInvite({
          hash: hash,
        })
      );
      result.id = Number(respCheckInvite.chat.id.value);
      result.title = respCheckInvite.chat.title;
      return result.id;
    } catch (e) {
      this.handleErrors(e, chat);
    }
    try {
      const respJoinInvite = await client.invoke(
        new Api.messages.ImportChatInvite({
          hash: hash,
        })
      );
      result.id = Number(respJoinInvite.chats[0].id);
      result.title = respJoinInvite.chats[0].title;
      return result.id;
    } catch (e) {
      this.handleErrors(e, chat);
    }
  }

  async joinPublicChat(client, hash, chat) {
    var result = {};
    console.log(hash);
    try {
      const resp = await client.invoke(
        new Api.channels.JoinChannel({
          channel: hash,
        })
      );
      console.log(resp);
      result.id = hash;
      result.title = resp.chats[0].title;
      return hash;
    } catch (e) {
      console.log(e);
      this.handleErrors(e, chat);
    }
  }

  async joinChat(chat) {
    const hash = chat.link.split('/')[1];
    const result = hash.includes('+')
      ? await this.joinPrivateChat(chat.client, hash.split('+')[1], chat)
      : await this.joinPublicChat(chat.client, hash, chat);
    if (!result) return null;
    console.log(result);
    const entity = await chat.client.getEntity(result);
    return entity;
  }

  async handleErrors(e, chat) {
    console.log(e);
    if (e.errorMessage === 'USER_DEACTIVATED_BAN') {
      console.log(e.errorMessage);
      await deleteOne(chat.account._id);
    }
    if (e.errorMessage === 'USER_DEACTIVATED') {
      console.log(e.errorMessage);
      await deleteOne(chat.account._id);
    }
    if (e.errorMessage === 'SESSION_REVOKED') {
      console.log(e.errorMessage);
      await deleteOne(chat.account._id);
    }
    if (e.errorMessage === 'AUTH_KEY_DUPLICATED') {
      console.log(e.errorMessage);
      await deleteOne(chat.account._id);
    }
    if (e.errorMessage === 'AUTH_KEY_UNREGISTERED ') {
      console.log(e.errorMessage);
      await deleteOne(chat.account._id);
    }
    if (e.errorMessage === 'INVITE_HASH_EXPIRED') {
      console.log(e.errorMessage);
      await deleteOne(chat.account._id);
    }
    if (e.errorMessage === 'FLOOD') {
      console.log(e.errorMessage);
      if (e.seconds > 300) {
        await unlinkFromAccount(chat._id);
        chat.account = null;
      }
    }
  }

  async changeProfile(me, client) {
    console.log(me);
    if (me.photo) {
      var result = await client.invoke(
        new Api.photos.GetUserPhotos({
          userId: me.id,
        })
      );
      result = await client.invoke(
        new Api.photos.DeletePhotos({
          id: result.photos,
        })
      );
    }
    if (me.lastname) {
      result = await client.invoke(
        new Api.account.UpdateProfile({
          lastName: '',
          about: '',
        })
      );
      console.log(result);
    }
  }

  async createClient(chat) {
    if (chat?.client) return;
    chat.account = await linkToAccount(chat._id);
    if (!chat?.account) return;
    const proxy =
      this.proxyList[Math.floor(Math.random() * this.proxyList.length)];
    const clientParams = {
      connectionRetries: 10,
      useWSS: false,
      proxy,
    };
    try {
      const stringSession = new StringSession(chat.account.key);
      const client = new TelegramClient(
        stringSession,
        chat.account.api_id,
        chat.account.api_hash,
        clientParams
      );

      client.floodSleepThreshold = 300;
      client.setLogLevel('info');
      client.setParseMode('html');
      await client.connect();
      const me = await client.getMe();
      chat.me = me;
      await this.changeProfile(me, client);
      return client;
    } catch (e) {
      this.handleErrors(e, chat);
      return;
    }
  }

  async initMonitor(chat) {
    while (true) {
      try {
        if (!chat) return;
        chat.client = await this.createClient(chat);
        if (!chat?.client) {
          await unlinkFromAccount(chat._id);
          chat.active = false;
          continue;
        }
        chat.entity = await this.joinChat(chat);
        if (!chat?.entity) {
          await unlinkFromAccount(chat._id);
          chat.active = false;
          continue;
        }
        chat.client.addEventHandler((event) => {
          handleGroupMessages(event, chat, this.requests, this.senders);
        }, new NewMessage({ incoming: true, chats: [chat.entity.id] }));
        chat.client.addEventHandler((event) => {
          handlePrivateMessages(event, chat, this.senders);
        }, new NewMessage({ incoming: true }));
        chat.active = true;
        return true;
      } catch (e) {
        chat.active = false;
        console.log(e);
      }
    }
  }

  async startMonitor(chat) {
    if (!chat.active) return await this.initMonitor(chat);
  }

  // async checkChatInvite(client, link) {
  //   const hash = link.split('+')[1];
  //   var result = {};
  //   const respCheckInvite = await client.invoke(
  //     new Api.messages.CheckChatInvite({
  //       hash: hash,
  //     })
  //   );
  //   result.id = Number(respCheckInvite.chat.id.value);
  //   result.title = respCheckInvite.chat.title;
  //   return result;
  // }

  async includeKeys(message, keys) {
    if (message.text) {
      for (const key of keys) {
        const res = message.text.toLowerCase().includes(key);
        if (res) {
          if (message._sender?.username && !message._sender.bot) {
            return message._sender?.username + '\n';
          }
        }
      }
    }
  }

  // async parseMessages(client, entity, keys) {
  //   var parsedUsers = [];
  //   const iterParams = { limit: 10000 };

  //   for await (const message of client.iterMessages(entity, iterParams)) {
  //     const user = await this.includeKeys(message, keys);
  //     if (user) parsedUsers.push(user);
  //   }
  //   const uniqueUsers = parsedUsers.filter(function (elem, pos) {
  //     return parsedUsers.indexOf(elem) === pos;
  //   });
  //   return uniqueUsers;
  // }

  // async initParse(keys, chat) {
  //   while (true) {
  //     await sleep(2000);
  //     try {
  //       const { client, id } = await this.createClient();
  //       if (!client) continue;
  //       const entity = await this.joinChat(client, chat);
  //       if (!entity) continue;
  //       const users = await this.parseMessages(client, entity, keys);
  //       this.livedAccs.push(id);
  //       return users;
  //     } catch (e) {
  //       console.log(e);
  //       if (!this.handleErrors(e)) break;
  //     }
  //   }
  // }

  // async handleAccs() {
  //   for (const acc of this.blockedAccs) {
  //     try {
  //       await deleteOne(acc);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   await unlinkAccs();
  // }

  // async parseChats(keys, chats) {
  //   this.setConsoleLog('Инициализация парсера...');
  //   const results = await Promise.all(
  //     chats.map(async (chat) => {
  //       return await this.initParse(keys, chat);
  //     })
  //   );
  //   const users = results.flat();
  //   const uniqueUsers = users.filter(function (elem, pos) {
  //     return users.indexOf(elem) === pos;
  //   });
  //   await this.handleAccs();
  //   this.setConsoleLog(`Получено ${uniqueUsers.length} пользователей`);
  //   return uniqueUsers;
  // }

  // async parseChats(keys, chats) {
  //   const keysList = keys.split(',');
  //   const usernameList = [];
  //   for (var i = 0; i < chats.length; i++) {
  //     const data = await this.createClient();
  //     if (!data) {
  //       i--;
  //       continue;
  //     }
  //     var result = {};
  //     try {
  //       result = await this.checkChatInvite(data.client, chats[i]);
  //     } catch (e) {
  //       if (e.seconds) {
  //         i--;
  //         continue;
  //       }
  //     }
  //     try {
  //       result = await this.joinPrivateChat(data.client, chats[i]);
  //     } catch (e) {
  //       if (e.errorMessage === 'USER_ALREDY_PARTICIPANT') {
  //         console.log(e.errorMessage);
  //       } else {
  //         i--;
  //         continue;
  //       }
  //     }
  //     try {
  //       const entity = await data.client.getEntity(result.id);
  //       console.log(entity);
  //       for await (const mes of data.client.iterMessages(entity, {
  //         limit: 10000,
  //       })) {
  //         if (mes.text) {
  //           for (const key of keysList) {
  //             const res = mes.text.toLowerCase().includes(key);
  //             if (res) {
  //               console.log(key);
  //               if (mes._sender?.username && !mes._sender.bot) {
  //                 console.log(mes._sender?.username);
  //                 usernameList.push(mes._sender?.username + '\n');
  //               }
  //             }
  //           }
  //         }
  //       }
  //     } catch (e) {
  //       console.log(e.errorMessage);
  //       i--;
  //       continue;
  //     }

  //     await data.client.disconnect();
  //     console.log(data.id);
  //   }
  //   const uniqueArray = usernameList.filter(function (elem, pos) {
  //     return usernameList.indexOf(elem) === pos;
  //   });
  //   console.log(uniqueArray);
  //   console.log(uniqueArray.length);
  //   return uniqueArray;

  //   // await Promise.all(
  //   //   chats.map(async (chat) => {
  //   //     console.log(account);
  //   //   })
  //   // );
  // }

  //   sliceIntoChunks(arr, chunkSize) {
  //     const res = [];
  //     for (let i = 0; i < arr.length; i += chunkSize) {
  //       const chunk = arr.slice(i, i + chunkSize);
  //       res.push(chunk);
  //     }
  //     return res;
  //   }

  //   async getMessagesId(client, bot) {
  //     var idList = [];
  //     for await (const mes of client.iterMessages(bot, { reverse: true })) {
  //       if (mes.text && mes.text !== '/start') {
  //         idList.push(mes.id);
  //         break;
  //       }
  //     }
  //     return idList;
  //   }

  //   nextUser() {
  //     const user = this._users[0];
  //     if (this._users) this._users.shift();
  //     return user;
  //   }

  //   async sendMessages() {
  //     // await Promise.all(
  //     //   this._clients.map(async (data, index) => {
  //     for (var j = 0; j < this._clients.length; j++) {
  //       const { client, id } = this._clients[j];
  //       const botEntity = await client.getEntity(this._bot);
  //       const idList = await this.getMessagesId(client, botEntity);
  //       for (var i = 0; i < 20; i++) {
  //         const user = this.nextUser();
  //         try {
  //           if (!user) break;
  //           await sleep(1000);
  //           const resp = await client.forwardMessages(user, {
  //             messages: idList,
  //             fromPeer: botEntity,
  //           });
  //           // const resp = await client.sendMessage(user, { message: 'Привет' });
  //           // console.log(resp);
  //           // if (index === 0 && i === 3) {
  //           //   throw 'asdasd';
  //           // }
  //           this.count++;
  //           if (resp) this.setConsoleLog(`${id}: sent message to ${user}`);
  //         } catch (e) {
  //           console.log(e);
  //           if (e.errorMessage) {
  //             this.setConsoleLog(`${id}: throws error ${e.errorMessage}`);
  //             this.setUsers([...this._users, user]);
  //           }
  //           this.handleErrors(e, id);
  //           break;
  //         }
  //       }
  //     }
  //     // })
  //     // );
  //     this.setConsoleLog(`Отправлено ${this.count} сообщений`);
  //   }

  //   async joinBot(bot) {
  //     this.setBot(bot);
  //     for (var j = 0; j < this._clients.length; j++) {
  //       const data = this._clients[j];
  //       try {
  //         const entity = await data.client.getEntity(bot);
  //         const response = await data.client.sendMessage(entity, {
  //           message: '/start',
  //         });
  //         this.setConsoleLog(`${data.id} joined to "${entity.username}"`);
  //       } catch (e) {
  //         console.log(e);
  //         if (e.errorMessage)
  //           this.setConsoleLog(`${data.id} throws error ${e.errorMessage}`);
  //       }
  //     }
  //   }

  //   async createClients(project) {
  //     this.count = 0;
  //     this.setUsers(project.usersList);
  //     const result = await Promise.all(
  //       project.accounts.map(async (account, index) => {
  //         const proxy = this.proxyList[index];
  //         const stringSession = new StringSession(account.key);
  //         try {
  //           const client = new TelegramClient(
  //             stringSession,
  //             account.api_id,
  //             account.api_hash,
  //             {
  //               connectionRetries: 10,
  //               useWSS: false,
  //               proxy,
  //             }
  //           );
  //           client.floodSleepThreshold = 10;
  //           client.setLogLevel('info');
  //           client.setParseMode('html');
  //           await client.connect();
  //           const me = await client.getMe();
  //           this.setConsoleLog(`${me.id} connected`);
  //           this.setClients([
  //             ...this._clients,
  //             { client, id: Number(me.id.value) },
  //           ]);
  //           return Number(me.id.value);
  //         } catch (e) {
  //           console.log(e.errorMessage);
  //         }
  //       })
  //     );
  //     this.setConsoleLog(`${this._clients.length} clients is ready`);
  //   }

  //   async disconnect() {
  //     const result = await Promise.all(
  //       this._clients.map(async (data) => {
  //         try {
  //           const { client, id } = data;
  //           await client.disconnect();
  //         } catch (e) {
  //           console.log(e);
  //         }
  //       })
  //     );
  //     this.setClients([]);
  //   }
  // }

  // const startSession = async (account, setConsoleLog) => {
  //   try {
  //     const stringSession = new StringSession(account.key);
  //     const client = new TelegramClient(
  //       stringSession,
  //       account.api_id,
  //       account.api_hash,
  //       {
  //         connectionRetries: 10,
  //         useWSS: false,
  //       }
  //     );
  //     client.setLogLevel('none');
  //     client.setParseMode('html');
  //     await client.connect();
  //     const me = await client.getMe();
  //     setConsoleLog(`${me.firstName} logged in`);
  //     console.log(me);
  //     await client.disconnect();
  //   } catch (e) {
  //     setConsoleLog(e.errorMessage);
  //   }
  // };

  // const startSpam = async (project, setConsoleLog) => {
  //   // setConsoleLog(`Start spam: ${project.usersList.length} users`);
  //   const results = await Promise.all(
  //     project.accounts.map(async (account, index) => {
  //       // setConsoleLog(`Account: ${account.phone}`);
  //       await startSession(account, setConsoleLog);
  //       // return await startSession(account, index);
  //     })
  //   );
  // };
}
export default TelegramService;
