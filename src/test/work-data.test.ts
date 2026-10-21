import { describe, expect, it } from 'vitest';
import { findWork, works } from '@/lib/work-data';

describe('Independent work records', () => {
  it('resolves each work independently with its own explanation and media', () => {
    expect(works.length).toBeGreaterThanOrEqual(3);
    expect(new Set(works.map(work => work.id)).size).toBe(works.length);
    for (const work of works) {
      expect(findWork(work.id)?.title).toBe(work.title);
      expect(work.intervention.length).toBeGreaterThan(50);
      expect(work.media.length).toBeGreaterThanOrEqual(2);
    }
  });
  it('does not substitute a service or another work for an unknown work', () => {
    expect(findWork('Pilotes')).toBeUndefined();
    expect(findWork('obra-inexistente')).toBeUndefined();
  });
});