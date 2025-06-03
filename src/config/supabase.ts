import dotenv from 'dotenv';
dotenv.config();

const SupabaseConfig = {
    url: process.env.SUPABASE_PROJECT_URL,
    db_pass: process.env.SUPABASE_DB_PASS,
    anonKey: process.env.SUPABASE_ANON_KEY,
}
export default SupabaseConfig