import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ffznzjygafnzyhpxohni.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmem56anlnYWZuenlocHhvaG5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzNTYzNTEsImV4cCI6MjAyODkzMjM1MX0.5kVSW4JgUv0Xd1IA9zOcDZzoXWG9BWq18dnH9g0gn6Q";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
