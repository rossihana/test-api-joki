import { act, renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import useOrderStore from './useOrderStore';

describe('useOrderStore', () => {
  // Reset store ke state awal sebelum setiap tes dijalankan
  beforeEach(() => {
    act(() => {
      useOrderStore.getState().setPrompt('');
    });
  });

  it('seharusnya memiliki nilai awal prompt berupa string kosong', () => {
    const { result } = renderHook(() => useOrderStore());
    expect(result.current.prompt).toBe('');
  });

  it('seharusnya memperbarui prompt ketika setPrompt dipanggil', () => {
    const { result } = renderHook(() => useOrderStore());
    const newPrompt = 'Ini adalah prompt tugas baru.';

    act(() => {
      result.current.setPrompt(newPrompt);
    });

    expect(result.current.prompt).toBe(newPrompt);
  });

  it('seharusnya bisa mengosongkan prompt dengan mengatur nilainya menjadi string kosong', () => {
    const { result } = renderHook(() => useOrderStore());
    
    // Atur prompt awal
    act(() => {
      result.current.setPrompt('Prompt awal untuk testing.');
    });

    expect(result.current.prompt).toBe('Prompt awal untuk testing.');

    // Kosongkan prompt
    act(() => {
      result.current.setPrompt('');
    });

    expect(result.current.prompt).toBe('');
  });
});
