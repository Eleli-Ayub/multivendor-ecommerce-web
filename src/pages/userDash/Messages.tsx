// import Sidebar from '../../components/Dashboard/Sidebar';
import ChatSidebar from '../../components/Chat/ChatSidebar';
import ChartBody from '../../components/Chat/ChartBody';

const Messages = () => {
    return (
        <div className="flex parent h-screen">
            {/* <Sidebar /> */}
            <div className="flex p-1 mx-auto my-body bg-yellow-600 h-[80vh]">
                <div className="bg-white flex-[0.3] price">
                    <ChatSidebar />
                </div>
                <div className="flex-[0.7]">
                    <ChartBody />
                </div>
            </div>
        </div>
    );
};

export default Messages;
