import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Interface for Supabase configuration
 */
interface SupabaseConfig {
    url: string;
    anonKey: string;
}

/**
 * SupabaseService manages the Supabase client connection
 */
class SupabaseService {
    private client: SupabaseClient;

    /**
     * Initializes Supabase client with provided configuration
     * @param config - Supabase configuration
     */
    constructor(config: SupabaseConfig) {
        this.client = createClient(config.url, config.anonKey);
    }

    /**
     * Returns the Supabase client instance
     * @returns SupabaseClient
     */
    getClient(): SupabaseClient {
        return this.client;
    }
}

/**
 * Factory function to create a Supabase service instance
 * @returns SupabaseService instance
 */
function createSupabaseService(): SupabaseService {
    const config: SupabaseConfig = {
        url: process.env.SUPABASE_URL || '',
        anonKey: process.env.SUPABASE_ANON_KEY || '',
    };

    if (!config.url || !config.anonKey) {
        throw new Error('Supabase configuration is incomplete. Check environment variables.');
    }

    return new SupabaseService(config);
}

export { SupabaseService, createSupabaseService };