import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://cupdzqjnmpepddawtukr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1cGR6cWpubXBlcGRkYXd0dWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MzAzNDIsImV4cCI6MjAyNTIwNjM0Mn0.O8JgpKLSgk3tz7GUeIk-WFeD4jpbr40ppd3mih_y8dM"
);
