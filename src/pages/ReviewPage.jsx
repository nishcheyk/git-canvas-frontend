import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, AlertTriangle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ScrollAnimateWrapper from '../components/landing/ScrollAnimateWrapper';
import ScoreCard from '../components/review/ScoreCard';
import StrengthsImprovements from '../components/review/StrengthsImprovements';
import IssuesList from '../components/review/IssuesList';

export default function ReviewPage() {
  const { username } = useParams();
  const [review, setReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const fetchReview = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backendBaseUrl}/api/review/${username}`);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Failed to fetch review');
      }
      const data = await response.json();
      setReview(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      fetchReview();
    }
  }, [username]);

  return (
    <div className="relative w-full h-screen bg-space-bg overflow-y-auto overflow-x-hidden scroll-smooth">
      <Helmet>
        <title>{isLoading ? `Analyzing ${username}...` : `AI Audit: ${username} | CodeCanvas`}</title>
        <meta name="description" content={`Read the brutally honest AI-generated code review and audit for ${username}'s GitHub profile.`} />
        <meta property="og:title" content={`AI Audit for ${username} | CodeCanvas`} />
        <meta property="og:description" content={`Read the brutally honest AI-generated code review and audit for ${username}'s GitHub profile.`} />
        <meta property="twitter:title" content={`AI Audit for ${username} | CodeCanvas`} />
        <meta property="twitter:description" content={`Read the brutally honest AI-generated code review and audit for ${username}'s GitHub profile.`} />
      </Helmet>

      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500 opacity-[0.05] blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-red-500 opacity-[0.03] blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12 md:py-20 max-w-4xl">
        
        {/* Header navigation */}
        <div className="flex items-center justify-between mb-12">
          <Link 
            to={`/universe/${username}`}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-mono text-sm uppercase tracking-wider">Back to Universe</span>
          </Link>
          
          <div className="text-right">
            <h1 className="text-sm font-mono text-indigo-400 uppercase tracking-widest">
              Universe Audit
            </h1>
            <p className="text-gray-500 text-xs mt-1">Target: @{username}</p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="relative flex items-center justify-center w-24 h-24">
              <div className="absolute w-20 h-20 border border-dashed border-indigo-500/40 rounded-full animate-[spin_4s_linear_infinite]" />
              <div className="absolute w-12 h-12 border border-indigo-400/20 border-t-indigo-400 rounded-full animate-spin" style={{ animationDuration: '1.2s' }} />
              <div className="w-6 h-6 rounded-full bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.6)] animate-[pulse_2s_ease-in-out_infinite]" />
            </div>
            <p className="text-sm font-mono text-indigo-400 uppercase tracking-widest animate-pulse">
              AI Analyzing {username}'s code...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 bg-red-500/5 border border-red-500/20 rounded-2xl">
            <AlertTriangle className="w-12 h-12 text-red-500 mb-2" />
            <h2 className="text-xl font-bold text-white">Analysis Failed</h2>
            <p className="text-red-400/80 text-center max-w-md">{error}</p>
            <button 
              onClick={fetchReview}
              className="mt-4 flex items-center gap-2 px-6 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg font-mono text-xs uppercase tracking-wider transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Retry Scan
            </button>
          </div>
        )}

        {/* Review Content */}
        {review && !isLoading && !error && (
          <div className="space-y-8">
            <ScoreCard score={review.score} title={review.title} />
            
            <ScrollAnimateWrapper animationType="fade-up" delay={0.3} className="text-center px-4 md:px-12 py-6">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed italic">
                "{review.summary}"
              </p>
            </ScrollAnimateWrapper>

            <IssuesList weaknesses={review.weaknesses} />
            <StrengthsImprovements strengths={review.strengths} recommendations={review.recommendations} />
          </div>
        )}
      </div>
    </div>
  );
}
