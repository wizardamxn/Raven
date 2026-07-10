// Sound palette — tap and hover cues from audio files in /public

export type SfxName = "tap" | "hover";

// Cache decoded audio buffers per AudioContext
const bufferCache = new WeakMap<
  AudioContext,
  Map<SfxName, AudioBuffer>
>();

async function fetchAudio(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return res.arrayBuffer();
}

async function decodeAudio(
  ac: AudioContext,
  buffer: ArrayBuffer
): Promise<AudioBuffer> {
  return ac.decodeAudioData(buffer);
}

async function getAudioBuffer(
  ac: AudioContext,
  name: SfxName
): Promise<AudioBuffer | null> {
  let cache = bufferCache.get(ac);
  if (!cache) {
    cache = new Map();
    bufferCache.set(ac, cache);
  }

  const cached = cache.get(name);
  if (cached) return cached;

  try {
    const url = `/${name}.wav`;
    const arrayBuffer = await fetchAudio(url);
    const decoded = await decodeAudio(ac, arrayBuffer);
    cache.set(name, decoded);
    return decoded;
  } catch (err) {
    console.error(`Failed to load audio ${name}:`, err);
    return null;
  }
}

export async function playSfx(
  ac: AudioContext,
  dest: AudioNode,
  name: SfxName
) {
  const buffer = await getAudioBuffer(ac, name);
  if (!buffer) return;

  const src = ac.createBufferSource();
  src.buffer = buffer;
  src.connect(dest);

  // Trim audio: hover starts at 41%, tap plays only 80%
  if (name === "hover") {
    const offset = buffer.duration * 0.41;
    const duration = buffer.duration * 0.59;
    src.start(ac.currentTime, offset, duration);
  } else if (name === "tap") {
    const duration = buffer.duration * 0.8;
    src.start(ac.currentTime, 0, duration);
  } else {
    src.start(ac.currentTime);
  }
}
