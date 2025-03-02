import { useState } from 'react';
import Closeicon from '../Icons/Closeicon';
import MyButton from './MyButton';
import axios from 'axios';

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Instagram = "instagram",
  Notion = "notion"
}

const Addbrain = ({ open, onclose }: { open: boolean; onclose: () => void }) => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [type, setType] = useState(ContentType.Youtube);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);

  // Function to extract YouTube video ID
  const getYoutubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // const getInstagramId = (url: string) => {
  //   const regex = /instagram\.com\/p\/([^/?]+)/;
  //   const match = url.match(regex);
  //   return match ? match[1] : null;
  // };

  // Function to validate Twitter URL
  const isValidTwitterUrl = (url: string) => {
    return url.includes('twitter.com') || url.includes('x.com');
  };

  // Function to validate Instagram URL
  const isValidInstagramUrl = (url: string) => {
    return url.includes('instagram.com');
  };

  // const handlePreviewError = () => {
  //   setPreviewError('Unable to load preview. Please verify the URL is correct and try again.');
  // };

  const validateForm = () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return false;
    }
    if (!link.trim()) {
      alert('Please enter a link');
      return false;
    }

    switch (type) {
      case ContentType.Youtube:
        if (!getYoutubeVideoId(link)) {
          alert('Please enter a valid YouTube URL');
          return false;
        }
        break;
      case ContentType.Twitter:
        if (!isValidTwitterUrl(link)) {
          alert('Please enter a valid Twitter URL');
          return false;
        }
        break;
      case ContentType.Instagram:
        if (!isValidInstagramUrl(link)) {
          alert('Please enter a valid Instagram URL');
          return false;
        }
        break;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await axios.post(
        'https://brainwave-jibt.onrender.com/api/v1/content',
        { title, link, type },
        {
          headers: {
            "Authorization": localStorage.getItem('token')
          },
        }
      );
      alert('Content added successfully!');
      setTitle('');
      setLink('');
      setType(ContentType.Youtube);
      setIsPreviewVisible(false);
      setPreviewError(null);
      onclose();
      window.location.reload(); // Refresh the page
    } catch (error: any) {
      alert('Error adding content: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg border border-gray-200">
      <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <p className="text-gray-600 text-center text-sm">{message}</p>
    </div>
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Add New Content</h2>
          <button
            onClick={onclose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <Closeicon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Content Type Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Content Type</label>
            <div className="flex gap-3">
              {Object.values(ContentType).map((contentType) => (
                <MyButton
                  key={contentType}
                  onClick={() => {
                    setType(contentType);
                    setPreviewError(null);
                  }}
                  varient={type === contentType ? 'primary' : 'secondary'}
                  text={contentType.charAt(0).toUpperCase() + contentType.slice(1)}
                />
              ))}
            </div>
          </div>

          {/* Link Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Content Link</label>
            <input
              type="text"
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
                setPreviewError(null);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={`Enter ${type} link...`}
              required
            />
          </div>

          {/* Title Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter title..."
              required
            />
          </div>


          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onclose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Content'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addbrain;