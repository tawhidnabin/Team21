import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mluhnyfsfyucjgvalxbj.supabase.co"; 
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sdWhueWZzZnl1Y2pndmFseGJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwMDMwMTgsImV4cCI6MjA1ODU3OTAxOH0.BawgJLIsGPdsh_NnmImCyyiQgDsBCVv7Ox7spOnZWHc";             

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
