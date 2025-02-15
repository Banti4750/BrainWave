import Shareicon from "../Icons/Shareicon";
import Deleticon from "../Icons/Deleticon";
import axios from "axios";

interface CardProps {
    contentId: string;
    title: string; // Changed from String to string
    link: string;
    type: "youtube" | "twitter" | "instagram" | "notion";
}

const Card = ({ contentId, title, link, type, }: CardProps) => {
    const deleteContent = async () => {
        if (!window.confirm("Are you sure you want to delete this content?")) return;
        try {
            await axios.delete(`http://localhost:3000/api/v1/delete/${contentId}`);
            alert("Content deleted successfully!");
            window.location.reload(); // Refresh the page
            // Trigger re-fetch or state update in parent component if needed
        } catch (err) {
            console.error("Failed to delete content", err);
            alert("Failed to delete content");
        }
    };

    const formatYouTubeLink = (url: string) => {
        try {
            return url.replace("watch?v=", "embed/");
        } catch {
            return url; // Fallback in case the link isn't formatted properly
        }
    };

    const formatTweetLink = (url: string) => {
        try {
            return url.replace("x.com", "twitter.com");
        } catch {
            return url; // Fallback in case the link isn't formatted properly
        }
    };

    const formatInstagramLink = (url: string) => {
        try {
            return `${url}embed/?omitscript=true`; // Instagram embed links require "embed/"
        } catch {
            return url;
        }
    };

    function formatNotionUrl(notionUrl: string) {
        const match = notionUrl.match(/([a-f0-9]{32})$/);
        return match ? `https://v2-embednotion.com/${match[1]}` : "Invalid Notion URL";
    }


    return (
        <div className="max-w-72 bg-white border border-gray-200 rounded-md shadow p-4 max-h-[620px]">
            {/* Header */}
            <div className="flex justify-between items-center">
                {/* Title and Share Icon */}
                <div className="flex items-center">
                    <div
                        className="pr-2 text-gray-500 cursor-pointer hover:text-gray-900"
                        title="Share"
                        aria-label="Share"
                    >
                        <Shareicon />
                    </div>
                    <span className="font-medium text-gray-800">{title}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center">
                    {/* Link Icon */}
                    <div
                        className="pr-4 text-gray-500 cursor-pointer hover:text-gray-900"
                        title="Open Link"
                        aria-label="Open Link"
                    >
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            <Shareicon />
                        </a>
                    </div>

                    {/* Delete Icon */}
                    <div
                        className="text-red-400 cursor-pointer hover:text-red-600"
                        title="Delete"
                        aria-label="Delete"
                    >
                        <div
                            //@ts-ignore
                            onClick={() => deleteContent()}
                        >
                            <Deleticon />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="py-4">
                {/* YouTube Embed */}
                {type === "youtube" && (
                    <iframe
                        className="w-full rounded-md"
                        src={formatYouTubeLink(link)}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                )}

                {/* Tweet Embed */}
                {type === "twitter" && (
                    <blockquote className="twitter-tweet">
                        <a href={formatTweetLink(link)}></a>
                    </blockquote>
                )}

                {/* Instagram Embed */}
                {type === "instagram" && (
                    <iframe
                        className="w-full rounded-md"
                        src={formatInstagramLink(link)}
                        // title="Instagram Post"
                        frameBorder="0"
                        scrolling="no"
                        referrerPolicy="strict-origin-when-cross-origin"
                    ></iframe>
                )}

                {/* Notion Emmbedd */}
                {type === "notion" && (

                    <div className="w-full max-w-6xl mx-auto p-4">
                        <div className="relative w-full aspect-w-16 aspect-h-9 rounded-md overflow-hidden shadow-lg">
                            {/* Overlay with clickable redirect */}
                            <a
                                href={link}  // Redirect to original Notion link
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center text-white text-2xl font-bold hover:bg-opacity-50 transition"
                            >
                                {/* <span>Click to View Notion Page</span> */}
                            </a>

                            {/* Embedded Notion iframe */}
                            <iframe
                                src={formatNotionUrl(link)}
                                className="w-full h-full border-none"
                                title="Notion Embed"
                            ></iframe>
                        </div>
                    </div>
                )}



            </div>
        </div>
    );
};

export default Card;
