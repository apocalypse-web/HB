
import React, { useState, useEffect, useRef } from 'react';

interface BackgroundMusicProps {
  isStarted: boolean;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ isStarted }) => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playerRef = useRef<any>(null);
  const isStartedRef = useRef(isStarted);
  
  // Track the isStarted prop in a ref so the YouTube API callbacks 
  // (which are defined once on init) always have access to the latest state.
  useEffect(() => {
    isStartedRef.current = isStarted;
    
    // If the journey starts and the player is already ready, trigger play immediately.
    if (isStarted && isPlayerReady && playerRef.current) {
      try {
        playerRef.current.unMute();
        playerRef.current.setVolume(100);
        playerRef.current.playVideo();
      } catch (err) {
        console.error("Manual play trigger failed:", err);
      }
    }
  }, [isStarted, isPlayerReady]);

  useEffect(() => {
    // 1. Function to load the YouTube IFrame API script
    const loadAPI = () => {
      if (window.YT && window.YT.Player) {
        initPlayer();
        return;
      }
      
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    };

    // 2. Function to initialize the actual player instance
    const initPlayer = () => {
      if (playerRef.current) return;

      playerRef.current = new window.YT.Player('youtube-player', {
        height: '1',
        width: '1',
        videoId: "3u61_k8EnJg",
        playerVars: {
          autoplay: 1, 
          controls: 0,
          loop: 1,
          playlist: "3u61_k8EnJg", // Required for looping
          modestbranding: 1,
          showinfo: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          enablejsapi: 1,
          playsinline: 1, // Essential for mobile browsers to avoid fullscreen
          origin: window.location.origin
        },
        events: {
          onReady: (event: any) => {
            setIsPlayerReady(true);
            event.target.setVolume(100);
            event.target.unMute();
            
            // Check the ref to see if the user already clicked "Come here"
            if (isStartedRef.current) {
              event.target.playVideo();
            }
          },
          onStateChange: (event: any) => {
            // Ensure looping behavior if the native loop parameter fails
            if (event.data === (window.YT?.PlayerState?.ENDED || 0)) {
              event.target.playVideo();
            }
          },
          onError: (e: any) => {
            console.error("YouTube Player API Error:", e.data);
          }
        },
      });
    };

    // Define the global callback for when the API script finishes loading
    window.onYouTubeIframeAPIReady = initPlayer;

    loadAPI();

    return () => {
      // We don't destroy the player on cleanup to allow it to persist 
      // through React's StrictMode double-mounting during development.
    };
  }, []);

  return (
    <div 
      className="fixed pointer-events-none opacity-0 overflow-hidden"
      style={{ left: '-10px', top: '-10px', width: '1px', height: '1px', zIndex: -1 }}
    >
      <div id="youtube-player" />
    </div>
  );
};

export default BackgroundMusic;
