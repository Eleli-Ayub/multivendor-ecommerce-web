import bg from '../../assets/chat.jpg';
import { Messages } from '../../data/messages';

const Chart = () => {
    return (
        <div
            className="h-[77.4vh] p-2 w-full overflow-y-auto"
            style={{ backgroundImage: `url(${bg})` }}
        >
            {Messages.map((message) => (
                <div className="">
                    <div
                        className={`${
                            message.status == 'sent' ? 'bg-green-300 ml-auto' : 'bg-gray-600'
                        } flex  w-[fit-content] p-4 rounded-[25px] gap-5 mb-5 text-[16px] relative  `}
                    >
                        <p>{message.message}</p>

                        <p className="text-sm">
                            {new Date(message.date).toLocaleString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                            })}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Chart;
