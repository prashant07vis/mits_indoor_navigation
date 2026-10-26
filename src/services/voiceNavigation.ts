export const isVoiceNavigationSupported =
  typeof window !== 'undefined' &&
  'speechSynthesis' in window;

export function speakInstruction(
  instruction: string,
  options?: { rate?: number; pitch?: number; volume?: number }
) {
  if (!isVoiceNavigationSupported) return;

  const text = instruction.trim();
  if (!text) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-IN';
  utterance.rate = options?.rate ?? 0.95;
  utterance.pitch = options?.pitch ?? 1;
  utterance.volume = options?.volume ?? 1;

  window.speechSynthesis.speak(utterance);
}

export function stopVoiceNavigation() {
  if (!isVoiceNavigationSupported) return;
  window.speechSynthesis.cancel();
}

export function replayInstruction(instruction: string) {
  speakInstruction(instruction, {
    rate: 0.95,
    pitch: 1,
    volume: 1,
  });
}
