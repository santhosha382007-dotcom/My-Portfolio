import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? 'home');

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visibleMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleMap.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleMap.delete(entry.target.id);
          }
        }

        if (visibleMap.size > 0) {
          let bestId = activeId;
          let bestScore = -1;
          for (const id of sectionIds) {
            const ratio = visibleMap.get(id);
            if (ratio !== undefined && ratio > bestScore) {
              bestScore = ratio;
              bestId = id;
            }
          }
          setActiveId(bestId);
        }
      },
      {
        rootMargin: '-22% 0px -52% 0px',
        threshold: [0, 0.15, 0.35, 0.6, 0.9],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(',')]);

  return activeId;
}
