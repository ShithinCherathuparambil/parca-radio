import { useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { useAudioStore } from '@/store/useAudioStore';

export function useAudioPlayer() {
    const {
        currentShow,
        isPlaying,
        volume,
        togglePlay,
        setIsLoading
    } = useAudioStore();

    const soundRef = useRef<Howl | null>(null);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space' && e.target === document.body) {
                e.preventDefault();
                togglePlay();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [togglePlay]);

    // Media Session API
    useEffect(() => {
        if (!currentShow || !('mediaSession' in navigator)) return;

        navigator.mediaSession.metadata = new MediaMetadata({
            title: currentShow.title,
            artist: currentShow.artistId, // Ideally this would be the actual artist name
            artwork: [
                { src: currentShow.coverImage, sizes: '96x96', type: 'image/jpeg' },
                { src: currentShow.coverImage, sizes: '128x128', type: 'image/jpeg' },
                { src: currentShow.coverImage, sizes: '192x192', type: 'image/jpeg' },
                { src: currentShow.coverImage, sizes: '256x256', type: 'image/jpeg' },
                { src: currentShow.coverImage, sizes: '384x384', type: 'image/jpeg' },
                { src: currentShow.coverImage, sizes: '512x512', type: 'image/jpeg' },
            ]
        });

        navigator.mediaSession.setActionHandler('play', () => togglePlay());
        navigator.mediaSession.setActionHandler('pause', () => togglePlay());

        return () => {
            navigator.mediaSession.setActionHandler('play', null);
            navigator.mediaSession.setActionHandler('pause', null);
        };
    }, [currentShow, togglePlay]);

    useEffect(() => {
        if (!currentShow) return;

        if (soundRef.current) {
            soundRef.current.unload();
        }

        setIsLoading(true);

        const sound = new Howl({
            src: [currentShow.audioUrl],
            html5: true,
            volume: volume,
            onplay: () => {
                setIsLoading(false);
                if ('mediaSession' in navigator) {
                    navigator.mediaSession.playbackState = 'playing';
                }
            },
            onpause: () => {
                if ('mediaSession' in navigator) {
                    navigator.mediaSession.playbackState = 'paused';
                }
            },
            onend: () => {
                togglePlay();
                if ('mediaSession' in navigator) {
                    navigator.mediaSession.playbackState = 'none';
                }
            },
            onloaderror: (id, error) => {
                console.error('Error loading audio:', error);
                setIsLoading(false);
            },
            onplayerror: (id, error) => {
                console.error('Error playing audio:', error);
                setIsLoading(false);
            }
        });

        soundRef.current = sound;

        if (isPlaying) {
            sound.play();
        }

        return () => {
            sound.unload();
        };
    }, [currentShow, setIsLoading, togglePlay]);

    // Sync volume
    useEffect(() => {
        if (soundRef.current) {
            soundRef.current.volume(volume);
        }
    }, [volume]);

    // Sync play/pause
    useEffect(() => {
        if (!soundRef.current) return;

        if (isPlaying && !soundRef.current.playing()) {
            soundRef.current.play();
        } else if (!isPlaying && soundRef.current.playing()) {
            soundRef.current.pause();
        }
    }, [isPlaying]);

    return null;
}
