import { createClient, SupabaseClient } from '@supabase/supabase-js';
import SupabaseConfig from '@config/supabase.js';
import { Application } from 'express';

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
export class SupabaseService {
    private client: SupabaseClient | undefined;



    connect(app: Application) {
        const config: SupabaseConfig = {
            url: SupabaseConfig.url,
            anonKey: SupabaseConfig.anonKey,
        };

        if (!config.url || !config.anonKey) {
            throw new Error('Supabase configuration is incomplete. Check environment variables.');
        }
        const client = createClient(config.url, config.anonKey);
        app.set("supabase", client);
        this.client = client;
        console.log('\x1b[46m', 'Supabase connection established successfully.', '\x1b[0m');
    }

    /**
     * Returns the Supabase client instance
     * @returns SupabaseClient
     */
    getClient(): SupabaseClient {
        return this.client as SupabaseClient;
    }
}

const supabaseService = new SupabaseService();
export const supabase = supabaseService.getClient();
