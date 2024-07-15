import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";

const chat = () => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [chat, setChat] = useState();
    const [img, setImg] = useState({
        file: null,
        url: "",
      });
    
      const { currentUser } = useUserStore();
      const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
    
    
    console.log(text);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
          setChat(res.data());
        });
    
        return () => {
          unSub();
        };
      }, [chatId]);

    const handleEmoji = (e) => {
        setText((prev) => prev + e.emoji);
        setOpen(false);
    }

    const handleImg = (e) => {
        if (e.target.files[0]) {
          setImg({
            file: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0]),
          });
        }
      };

    const handleSend = async () => {
        if (text === "") return;
    
        let imgUrl = null;
    
        try {
          if (img.file) {
            imgUrl = await upload(img.file);
          }
    
          await updateDoc(doc(db, "chats", chatId), {
            messages: arrayUnion({
              senderId: currentUser.id,
              text,
              createdAt: new Date(),
              ...(imgUrl && { img: imgUrl }),
            }),
          });
    
          const userIDs = [currentUser.id, user.id];
    
          userIDs.forEach(async (id) => {
            const userChatsRef = doc(db, "userchats", id); 
            const userChatsSnapshot = await getDoc(userChatsRef);
    
            if (userChatsSnapshot.exists()) {
              const userChatsData = userChatsSnapshot.data();
    
              const chatIndex = userChatsData.chats.findIndex(
                (c) => c.chatId === chatId
              );
    
              userChatsData.chats[chatIndex].lastMessage = text;
              userChatsData.chats[chatIndex].isSeen =
                id === currentUser.id ? true : false;
              userChatsData.chats[chatIndex].updatedAt = Date.now();
    
              await updateDoc(userChatsRef, {
                chats: userChatsData.chats,
              });
            }
          });
        } catch (err) {
          console.log(err);
        } finally{
        setImg({
          file: null,
          url: "",
        });
    
        setText("");
        }
      };

    return (
        <div className="chat">
            <div className="top">
                <div className="user">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <span>Elon Musk</span>
                        <p>Lorem ipsum dolor sit</p>
                    </div>
                </div>

                <div className="icons">
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>

            <div className="center">
                { chat?.messages?.map((message) => (
                <div className="message own" key={message?.createdAt}>
                    {/* <img src="./avatar.png" alt="" /> */}
                    <div className="texts">
                        {message.img && <img src={message.img} alt="" />}
                        <p>
                            {message.text}
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                ))
                }   

            </div>

            <div className="bottom">
                <div className="icons">
                    <img src="./img.png" alt="" />
                    <img src="./camera.png" alt="" />
                    <img src="./mic.png" alt="" />
                </div>
                <input type="text" placeholder="Type your message here" value={text} 
                onChange={(e) =>setText(e.target.value)}
                />
                <div className="emoji">
                    <img src="./emoji.png" alt="" onClick={()=> setOpen((prev) => !prev)}
                    />
                    <div className="picker">
                    <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
                    </div>
                </div>
                <button className="sendButton" onClick={handleSend}>send</button>
            </div>

        </div>
    );
};

export default chat;