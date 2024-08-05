import '@vidstack/react/player/styles/base.css';
import { useEffect, useRef, useState } from 'react';
import {
  isHLSProvider,
  MediaPlayer,
  MediaProvider,
  Poster,
  Track,
  type MediaCanPlayDetail,
  type MediaCanPlayEvent,
  type MediaPlayerInstance,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
} from '@vidstack/react';
import { VideoLayout } from './components/layouts/video-layout';
import { textTracks } from './tracks';

const highlights = [
  { name: 'Goal by Player 1', start: 5, end: 15 },
  { name: 'Amazing Save by Goalkeeper', start: 800, end: 810 },
  { name: 'Yellow Card Incident', start: 1600, end: 1610 },
  { name: 'Another Goal by Player 2', start: 50, end: 60 },
  { name: 'Final Whistle', start: 65, end: 75 },
];

export function Player() {
  const playerRef = useRef<MediaPlayerInstance>(null);
  const [currentHighlight, setCurrentHighlight] = useState(highlights[0]);

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    nativeEvent: MediaProviderChangeEvent
  ) {
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }

  return (
    <div>
      <MediaPlayer
        className="w-full aspect-video bg-slate-900 text-white font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4"
        title="Sprite Fight"
        src="https://hiwajovideov2.azureedge.net/videos/4-2024-114654-2024-05-04.mp4"
        crossOrigin
        clipStartTime={currentHighlight.start}
        clipEndTime={currentHighlight.end}
        playsInline
        onProviderChange={onProviderChange}
        ref={playerRef}
        autoPlay={true}
      >
        <MediaProvider>
          <Poster
            className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
            src="https://hiwajovideov2.azureedge.net/videos/4-2024-114654-2024-05-04.webp"
            alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
          />
          {textTracks.map((track) => (
            <Track {...track} key={track.src} />
          ))}
        </MediaProvider>

        <VideoLayout
          thumbnails="https://hiwajovideov2.azureedge.net/videos/4-2024-114654-2024-05-04.webp"
          setCurrentHighlight={setCurrentHighlight}
          highlights={highlights}
          currentHighlight={currentHighlight}
        />
      </MediaPlayer>
    </div>
  );
}
