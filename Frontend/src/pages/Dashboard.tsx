import { useState } from "react";
import Addbrain from "../Components/Addbrain";
import Card from "../Components/Card";
import MyButton from "../Components/MyButton";
import Addicon from "../Icons/Addicon";
import Sidebar from "../Components/Sidebar";
import { useContent } from "../hooks/useContents";
import { useNavigate } from "react-router-dom";
// import SearchComponent from "../Components/Search";
// import { ShareBrainButton } from "../Components/ShareBrainButton";

const Dashboard = () => {
    const [openbox, setopenBox] = useState(false);
    // const [filteredContent, setFilteredContent] = useState<any[]>([]);
    const content = useContent(); // Fetch all content
    const navigate = useNavigate();

    // Extract the user ID correctly
    //@ts-ignore
    const userIdFilter = content.length > 0 ? content[0].userId._id : null;



    function logout() {
        localStorage.removeItem("token");
        navigate("/");
    }

    // Filter content by user ID correctly
    // const displayedContent =
    //     filteredContent.length > 0
    //         ? filteredContent.filter((item) => item._id === userIdFilter)
    //         : content

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <main className="flex-1 ml-64">
                <Addbrain open={openbox} onclose={() => setopenBox(false)} />

                {/* Header Section */}
                <div className="p-4 border-b border-gray-200">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                            {/* <SearchComponent onSearch={setFilteredContent} /> */}
                            <div className="flex space-x-4">
                                <MyButton
                                    varient="primary"
                                    text="Add Content"
                                    starticon={<Addicon />}
                                    onClick={() => setopenBox(true)}
                                />
                                {/* <ShareBrainButton /> */}
                                <MyButton varient="third" text="Logout" onClick={logout} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="flex gap-4 flex-wrap min-h-screen m-4">
                    {content.map(({ _id, title, link, type }) => (
                        <Card key={_id} contentId={_id} title={title} link={link} type={type} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;


