import './chatList.css';
import { useState } from 'react';

const ChatList = () => {
    const [addMode, setAddMode] = useState(false);
    return (
        <div className="chatList">
            <div className='search'>
                <div className='searchbar'>
                    <img src="./search.png" alt="" />
                    <input type="text" placeholder='search' />
                </div>
                <img src={addMode ? "./minus.png" : "./plus.png"} alt="" className='add' 
                onClick={()=> setAddMode((prev)=> !prev )}
                />
            </div>

            <div className='item'>
                <img src="./avatar.png" alt="" />
                <div className='texts'>
                    <span>John Cena</span>
                    <p>hello last message</p>
                </div>
            </div>

            <div className='item'>
                <img src="./avatar.png" alt="" />
                <div className='texts'>
                    <span>John cena</span>
                    <p>hello last message</p>
                </div>
            </div>

            <div className='item'>
                <img src="./avatar.png" alt="" />
                <div className='texts'>
                    <span>John cena</span>
                    <p>hello last message</p>
                </div>
            </div>

            <div className='item'>
                <img src="./avatar.png" alt="" />
                <div className='texts'>
                    <span>John cena</span>
                    <p>hello last message</p>
                </div>
            </div>
        </div>
    );
}

export default ChatList;