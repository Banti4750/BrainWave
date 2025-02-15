import { useState } from "react"
import Addbrain from "../Components/Addbrain"
import Card from "../Components/Card"
import MyButton from "../Components/MyButton"
import Addicon from "../Icons/Addicon"
import Shareicon from "../Icons/Shareicon"
import Sidebar from "../Components/Sidebar"
import { useInstagramContext } from "../hooks/useInstagarmContext"
import { useNavigate } from "react-router-dom"
import SearchComponent from "../Components/Search"

const InstagramDashboard = () => {
    const [openbox, setopenBox] = useState(false);
    const content = useInstagramContext();
    const navigate = useNavigate();
    function logout() {
        localStorage.removeItem('token'); // Correct method
        navigate('/');
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <main className="flex-1 ml-64">
                <Addbrain open={openbox} onclose={() => setopenBox(false)} />

                {/* Header Section */}
                <div className="p-4 border-b border-gray-200">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-semibold text-gray-900">Instagram Dashboard</h1>
                            <SearchComponent />
                            <div className="flex space-x-4">
                                <MyButton
                                    varient="primary"
                                    text="Add Content"
                                    starticon={<Addicon />}
                                    onClick={() => setopenBox(true)}
                                />
                                <MyButton
                                    varient="secondary"
                                    text="Share Brain"
                                    starticon={<Shareicon />}
                                />

                                <MyButton
                                    varient="third"
                                    text="Logout"
                                    onClick={logout}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="flex gap-4 flex-wrap min-h-screen   m-4">
                    {content.map(({ _id, title, link, type },) => (

                        <Card

                            contentId={_id} // Pass the correct contentId
                            title={title}
                            link={link}
                            type={type}
                        />

                    ))}
                </div>

            </main>
        </div>
    )
}



export default InstagramDashboard;