import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { Episode, episodes } from "../data/episodes";

interface AudioContextType {
  currentEpisode: Episode | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playEpisode: (ep: Episode) => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  skip: (seconds: number) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(episodes[0] || null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(180); // default 3 min demo audio duration
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener("loadedmetadata", () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    });

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const playEpisode = (ep: Episode) => {
    setCurrentEpisode(ep);
    setIsPlaying(true);
    if (audioRef.current) {
      if (ep.audioUrl) {
        audioRef.current.src = ep.audioUrl;
      }
      audioRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  };

  const togglePlay = () => {
    if (!currentEpisode && episodes.length > 0) {
      playEpisode(episodes[0]);
      return;
    }
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    setCurrentTime(time);
  };

  const skip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(audioRef.current.currentTime + seconds, duration));
    }
  };

  return (
    <AudioContext.Provider
      value={{
        currentEpisode,
        isPlaying,
        currentTime,
        duration,
        playEpisode,
        togglePlay,
        seek,
        skip
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within an AudioProvider");
  return ctx;
};
