/* tslint:disable */
/* eslint-disable */

/**
 * Configuration for audio engine
 */
export class AudioConfig {
    free(): void;
    [Symbol.dispose](): void;
    constructor();
    bird_count: number;
    buffer_size: number;
    reverb_enabled: boolean;
    sample_rate: number;
}

/**
 * Main audio engine state
 */
export class AudioEngine {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Add a bird voice to the scene
     */
    add_bird(species: string, position_x: number, position_y: number): void;
    /**
     * Generate audio buffer for morning birds
     * Returns a Float32Array containing audio samples
     */
    generate_bird_buffer(duration_secs: number, intensity: number): Float32Array;
    /**
     * Generate a gentle breeze sound
     */
    generate_breeze(duration_secs: number, intensity: number): Float32Array;
    /**
     * Create a new audio engine
     */
    constructor(sample_rate: number);
    /**
     * Reset the engine state
     */
    reset(): void;
    /**
     * Get sample rate
     */
    readonly sample_rate: number;
}

/**
 * Flute synthesizer
 */
export class Flute {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Generate flute sound
     * Combines sine wave with filtered noise for breath sound
     */
    generate(frequency: number, duration: number, breathiness: number): Float32Array;
    /**
     * Create new flute synthesizer
     */
    constructor(sample_rate: number);
}

/**
 * Harp synthesizer
 */
export class Harp {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Create new harp synthesizer
     */
    constructor(sample_rate: number);
    /**
     * Generate harp pluck
     * Bright attack with quick decay
     */
    pluck(frequency: number, duration: number): Float32Array;
}

/**
 * Piano synthesizer using Karplus-Strong algorithm
 */
export class Piano {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Create new piano synthesizer
     */
    constructor(sample_rate: number);
    /**
     * Trigger a note
     */
    play_note(frequency: number, velocity: number): void;
    /**
     * Generate audio buffer
     */
    process(num_samples: number): Float32Array;
}

/**
 * String section synthesizer
 */
export class Strings {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Generate string ensemble sound
     * Uses detuned sawtooth waves for rich texture
     */
    generate(frequency: number, duration: number): Float32Array;
    /**
     * Create new string synthesizer
     */
    constructor(sample_rate: number);
}

/**
 * Initialize the audio engine module
 * Call this once when the WASM module loads
 */
export function init(): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_audioconfig_free: (a: number, b: number) => void;
    readonly __wbg_audioengine_free: (a: number, b: number) => void;
    readonly __wbg_flute_free: (a: number, b: number) => void;
    readonly __wbg_get_audioconfig_bird_count: (a: number) => number;
    readonly __wbg_get_audioconfig_buffer_size: (a: number) => number;
    readonly __wbg_get_audioconfig_reverb_enabled: (a: number) => number;
    readonly __wbg_get_audioconfig_sample_rate: (a: number) => number;
    readonly __wbg_harp_free: (a: number, b: number) => void;
    readonly __wbg_piano_free: (a: number, b: number) => void;
    readonly __wbg_set_audioconfig_bird_count: (a: number, b: number) => void;
    readonly __wbg_set_audioconfig_buffer_size: (a: number, b: number) => void;
    readonly __wbg_set_audioconfig_reverb_enabled: (a: number, b: number) => void;
    readonly __wbg_set_audioconfig_sample_rate: (a: number, b: number) => void;
    readonly __wbg_strings_free: (a: number, b: number) => void;
    readonly audioconfig_new: () => number;
    readonly audioengine_add_bird: (a: number, b: number, c: number, d: number, e: number) => [number, number];
    readonly audioengine_generate_bird_buffer: (a: number, b: number, c: number) => [number, number, number, number];
    readonly audioengine_generate_breeze: (a: number, b: number, c: number) => [number, number, number, number];
    readonly audioengine_new: (a: number) => [number, number, number];
    readonly audioengine_reset: (a: number) => void;
    readonly audioengine_sample_rate: (a: number) => number;
    readonly flute_generate: (a: number, b: number, c: number, d: number) => [number, number];
    readonly flute_new: (a: number) => number;
    readonly harp_new: (a: number) => number;
    readonly harp_pluck: (a: number, b: number, c: number) => [number, number];
    readonly init: () => void;
    readonly piano_new: (a: number) => number;
    readonly piano_play_note: (a: number, b: number, c: number) => void;
    readonly piano_process: (a: number, b: number) => [number, number];
    readonly strings_generate: (a: number, b: number, c: number) => [number, number];
    readonly strings_new: (a: number) => number;
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
