import  { useState, useEffect } from 'react';
import { ChevronRight, Brain, NotebookPen, Sparkles, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-800">Brainly</span>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              Features
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              Pricing
            </button>
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={() =>navigate('/signin')}
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className={`max-w-3xl mx-auto text-center transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Your Second Brain for
              <span className="text-indigo-600"> Limitless Thinking</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Capture, organize, and discover your ideas with an AI-powered personal knowledge assistant
              that grows with you.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                 onClick={() =>navigate('/signup')}
              >
                <span>Get Started</span>
                <ChevronRight className="h-5 w-5" />
              </button>
              <button className="px-8 py-3 border-2 border-gray-200 text-gray-600 rounded-lg hover:border-indigo-600 hover:text-indigo-600 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <NotebookPen className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Note-Taking</h3>
              <p className="text-gray-600">
                Capture your thoughts with AI-powered organization and automatic linking.
              </p>
            </div>
            <div className={`transform transition-all duration-1000 delay-200 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <Sparkles className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI Insights</h3>
              <p className="text-gray-600">
                Discover patterns and connections in your knowledge with advanced AI analysis.
              </p>
            </div>
            <div className={`transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <Share2 className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Seamless Sharing</h3>
              <p className="text-gray-600">
                Collaborate with others and share your knowledge effortlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;