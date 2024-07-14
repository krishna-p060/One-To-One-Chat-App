import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
const chat = () => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");

    console.log(text);

    const handleEmoji = (e) => {
        setText((prev) => prev + e.emoji);
        setOpen(false);
    }
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
                <div className="message own">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet consectetur 
                            adipisicing elit. Adipisci atque 
                            explicabo itaque quibusdam doloribus vero provident magni 
                            dignissimos ullam assumenda.
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>

                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet consectetur 
                            adipisicing elit. Adipisci atque 
                            explicabo itaque quibusdam doloribus vero provident magni 
                            dignissimos ullam assumenda.
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>


                <div className="message own">
                    
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet consectetur 
                            adipisicing elit. Adipisci atque 
                            explicabo itaque quibusdam doloribus vero provident magni 
                            dignissimos ullam assumenda.
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>

                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet consectetur 
                            adipisicing elit. Adipisci atque 
                            explicabo itaque quibusdam doloribus vero provident magni 
                            dignissimos ullam assumenda.
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>

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
                <button className="sendButton">send</button>
            </div>

        </div>
    );
};

export default chat;