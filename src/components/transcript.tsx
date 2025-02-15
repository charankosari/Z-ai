import { cn } from "@/lib/utils";
import { useAgent } from "@/hooks/use-agent";
import { useEffect, useRef, RefObject, useState } from "react";

export function Transcript({
  scrollContainerRef,
  scrollButtonRef,
}: {
  scrollContainerRef: RefObject<HTMLElement>;
  scrollButtonRef: RefObject<HTMLButtonElement>;
}) {
  const { displayTranscriptions } = useAgent();
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Store all transcriptions
  const [transcriptionHistory, setTranscriptionHistory] = useState<string[]>(
    []
  );

  const calculateDistanceFromBottom = (container: HTMLElement) => {
    const { scrollHeight, scrollTop, clientHeight } = container;
    return scrollHeight - scrollTop - clientHeight;
  };

  const handleScrollVisibility = (
    container: HTMLElement,
    scrollButton: HTMLButtonElement
  ) => {
    const distanceFromBottom = calculateDistanceFromBottom(container);
    const shouldShowButton = distanceFromBottom > 100;
    setShowScrollButton(shouldShowButton);
    scrollButton.style.display = shouldShowButton ? "flex" : "none";
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    const scrollButton = scrollButtonRef.current;
    if (container && scrollButton) {
      const handleScroll = () =>
        handleScrollVisibility(container, scrollButton);

      handleScroll(); // Check initial state
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [scrollContainerRef, scrollButtonRef, displayTranscriptions]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const distanceFromBottom = calculateDistanceFromBottom(container);
      const isNearBottom = distanceFromBottom < 100;

      if (isNearBottom) {
        transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [displayTranscriptions]);

  const scrollToBottom = () => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const scrollButton = scrollButtonRef.current;
    if (scrollButton) {
      scrollButton.addEventListener("click", scrollToBottom);
      return () => scrollButton.removeEventListener("click", scrollToBottom);
    }
  }, [scrollButtonRef]);

  useEffect(() => {
    if (displayTranscriptions.length === 0) return;

    const latestTranscript = displayTranscriptions.at(-1)?.segment.text.trim();
    if (!latestTranscript) return;
    const storedTranscripts = JSON.parse(
      localStorage.getItem("last_transcripts") || "[]"
    );
    const updatedTranscripts = [...storedTranscripts, latestTranscript];
    localStorage.setItem(
      "last_transcripts",
      JSON.stringify(updatedTranscripts)
    );
    console.log("Saved to localStorage:", updatedTranscripts);
  }, [displayTranscriptions]);

  return (
    <>
      <div className="flex items-center text-xs font-semibold uppercase tracking-widest sticky top-0 left-0 bg-white w-full p-4">
        Transcript
      </div>
      <div className="p-4 min-h-[300px] relative">
        {displayTranscriptions.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-300 text-sm">
            Get talking to start the conversation!
          </div>
        ) : (
          <div className="space-y-4">
            {displayTranscriptions.map(({ segment, participant }) =>
              segment.text.trim() !== "" ? (
                <div
                  key={segment.id}
                  className={cn(
                    "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                    participant?.isAgent
                      ? "bg-neutral-100 text-[#09090B]"
                      : "ml-auto border border-neutral-300"
                  )}
                >
                  {segment.text.trim()}
                </div>
              ) : null
            )}
            <div ref={transcriptEndRef} />
          </div>
        )}
      </div>
    </>
  );
}
