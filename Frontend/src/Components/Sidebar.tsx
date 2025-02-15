
import { useNavigate } from 'react-router-dom'
import Twitericon from '../Icons/Twitericon'
import Youtubeicon from '../Icons/Youtubeicon'
import Instagarm from '../Icons/Instagarm'
import { Brain } from 'lucide-react'

const Sidebar = () => {
    const navigate = useNavigate();

    function handleShowTweetOnly() {
        navigate('/tweet');
        window.location.reload(); // Refresh the page
    }

    return (
        <div className='bg-white w-64 p-4 fixed top-0 left-0 h-screen border border-r-2'>
            <div className='flex gap-4'>
                <Brain className="h-8 w-8 text-indigo-600" />
                <span className="text-2xl font-bold text-gray-800">Brainly</span>
            </div>

            <div className='m-4 flex gap-2 items-center cursor-pointer hover:bg-slate-300 p-2 rounded-md transition-all'
                onClick={() => navigate('/dashboard')}
            >
                <Brain className="h-8 w-8 text-indigo-600" />
                <h1 >
                    All Content
                </h1>
            </div>

            <div className='m-4 flex gap-2 items-center cursor-pointer hover:bg-slate-300 p-2 rounded-md transition-all'
                onClick={handleShowTweetOnly}
            >
                <Twitericon />
                <h1 >
                    Twitter
                </h1>
            </div>
            <div className='m-4 flex gap-2 items-center cursor-pointer hover:bg-slate-300 p-2 rounded-md transition-all'
                onClick={() => navigate('/youtube')}
            >
                <Youtubeicon />
                <h1 >
                    Youtube
                </h1>
            </div>

            <div className='m-4 flex gap-2 items-center cursor-pointer hover:bg-slate-300 p-2 rounded-md transition-all'
                onClick={() => navigate('/instagram')}
            >
                <Instagarm />
                <h1 >
                    Instagram
                </h1>
            </div>

            {/* Notion  */}
            <div className='m-4 flex gap-2 items-center cursor-pointer hover:bg-slate-300 p-2 rounded-md transition-all'
                onClick={() => navigate('/notion')}
            >
                <Instagarm />
                <h1 >
                    Notion
                </h1>
            </div>
        </div>
    )
}

export default Sidebar