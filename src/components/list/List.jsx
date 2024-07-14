import ChatList from "./chatList/ChatList";
import "./list.css";
import UserInfo from "./userInfo/UserInfo";

const list = () => {
    return (
        <div className="list">
            <UserInfo />
            <ChatList />
        </div>
    );
};

export default list;