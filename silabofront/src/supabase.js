// src/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rrmiwhgqmkaolfyafjjz.supabase.co' 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJybWl3aGdxbWthb2xmeWFmamp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5ODU4ODEsImV4cCI6MjA2MTU2MTg4MX0.zMHby_VV9ulF4fIwrEnO0e--6U5zGhyOWAXiduJVPEM' 

export const supabase = createClient(supabaseUrl, supabaseKey)
