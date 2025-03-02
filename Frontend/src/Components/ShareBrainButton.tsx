// import { useState, useCallback, useEffect } from 'react';
// import { Copy, Share2, X } from 'lucide-react';
// import axios from 'axios';
// import Sharedcard from './Sharedcard';

// // Types
// interface ShareResponse {
//     hash?: string;
//     message?: string;
//     error?: string;
// }

// interface SharedContent {
//     username: string;
//     content: Array<{
//         _id: string;
//         title: string;
//         link: string;
//         type: string;
//     }>;
// }


// export const ShareBrainButton = () => {
//     const [isSharing, setIsSharing] = useState(false);
//     const [shareLink, setShareLink] = useState<string | null>(null);
//     const [error, setError] = useState<string | null>(null);

//     const handleShare = async () => {
//         try {
//             setIsSharing(true);
//             setError(null);

//              localStorage.getItem('token');
//             const userId = '6787d48b93d827888d849b4f';  // Replace this with actual userId (you might need to pass it from a global state or context)

//             const response = await axios.post<ShareResponse>(
//                 'http://localhost:3000/api/v1/share',
//                 {
//                     share: !shareLink, // Toggle sharing state
//                     userId,           // Explicitly pass the userId
//                 },
//                 // {
//                 //     // headers: {
//                 //     //     Authorization: `Bearer ${token}`
//                 //     // }
//                 // }
//             );

//             if (response.data.hash) {
//                 const fullLink = `${window.location.origin}/share/${response.data.hash}`;
//                 setShareLink(fullLink);
//             } else {
//                 setShareLink(null);
//             }
//         } catch (err) {
//             setError('Failed to generate share link');
//             console.error('Share error:', err);
//         } finally {
//             setIsSharing(false);
//         }
//     };

//     const copyToClipboard = useCallback(async () => {
//         if (shareLink) {
//             try {
//                 await navigator.clipboard.writeText(shareLink);
//                 // You could add a toast notification here
//             } catch (err) {
//                 setError('Failed to copy link');
//             }
//         }
//     }, [shareLink]);

//     return (
//         <div className="relative flex">
//             <button
//                 onClick={handleShare}
//                 disabled={isSharing}
//                 className={`inline-flex items-center px-4 py-2 rounded-lg ${shareLink
//                     ? 'bg-red-500 hover:bg-red-600'
//                     : 'bg-blue-500 hover:bg-blue-600'
//                     } text-white transition-colors`}
//             >
//                 {isSharing ? (
//                     <div className="flex items-center">
//                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
//                         Processing...
//                     </div>
//                 ) : shareLink ? (
//                     <>
//                         <X className="w-4 h-4 mr-2" />
//                         Stop Sharing
//                     </>
//                 ) : (
//                     <>
//                         <Share2 className="w-4 h-4 mr-2" />
//                         Share Brain
//                     </>
//                 )}
//             </button>

//             {shareLink && (
//                 <div className="mt-2  bg-white rounded-lg shadow-lg border border-gray-200">
//                     <div className="flex flex-1  items-center gap-2">
//                         <input
//                             type="text"
//                             value={shareLink}
//                             readOnly
//                             className="flex-1 p-2 border rounded bg-gray-50"
//                         />
//                         <button
//                             onClick={copyToClipboard}
//                             className="p-2 text-gray-600 hover:text-gray-900"
//                         >
//                             <Copy className="w-5 h-5" />
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {error && (
//                 <div className="mt-2 text-red-500 text-sm">
//                     {error}
//                 </div>
//             )}
//         </div>
//     );
// };


// // Shared Content View Component
// export const SharedBrainView = () => {
//     const [sharedContent, setSharedContent] = useState<SharedContent | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     const hash = window.location.pathname.split('/share/')[1];

//     useEffect(() => {
//         const fetchSharedContent = async () => {
//             try {
//                 const response = await axios.get<SharedContent>(
//                     `http://localhost:3000/api/v1/${hash}`
//                 );
//                 setSharedContent(response.data);
//             } catch (err) {
//                 setError('Failed to load shared content');
//                 console.error('Fetch error:', err);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         if (hash) {
//             fetchSharedContent();
//         }
//     }, [hash]); // Added hash as dependency

//     if (isLoading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
//             </div>
//         );
//     }

//     if (error || !sharedContent) {
//         return (
//             <div className="flex flex-col items-center justify-center min-h-screen">
//                 <div className="text-xl text-gray-800 mb-2">
//                     Unable to load shared content
//                 </div>
//                 <div className="text-gray-600">
//                     This share link may be invalid or has expired
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="max-w-7xl mx-auto px-4 py-8">
//             <div className="mb-8">
//                 <h1 className="text-2xl font-bold text-gray-900">
//                     {sharedContent.username}'s Shared Brain
//                 </h1>
//             </div>

//             {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {sharedContent.content.map((item) => (
//                     <div
//                         key={item._id}
//                         className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
//                     >
//                         <div className="flex items-start justify-between">
//                             <div>
//                                 <h3 className="text-lg font-medium text-gray-900">
//                                     {item.title}
//                                 </h3>
//                                 <p className="mt-1 text-sm text-gray-600">
//                                     {item.type}
//                                 </p>
//                             </div>
//                         </div>
//                         <a
//                             href={item.link}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
//                         >
//                             View Content
//                             <span className="ml-1">→</span>
//                         </a>
//                     </div>
//                 ))}
//             </div> */}



//             <div className="flex gap-24 flex-wrap min-h-screen m-4">

//                 {sharedContent.content.map(({ _id, title, link, type }) => (
//                     <div key={_id} className="p-4 bg-white rounded-lg shadow-md">
//                         <Sharedcard contentId={_id} title={title} link={link} type={type} />
//                         <a
//                             href={link} // Use the link from each content item
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
//                         >
//                             View Content
//                             <span className="ml-1">→</span>
//                         </a>
//                     </div>
//                 ))}
//             </div>

//         </div>
//     );
// };