import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Passkeys (Face ID, Touch ID, huella) para entrar sin teclear la clave.
    // El API de Supabase Auth es experimental y lanza en cada método salvo que
    // se pida aquí. Es lo único que cambia: persistSession, autoRefreshToken,
    // flowType, storageKey y detectSessionInUrl siguen con su valor por defecto
    // (comprobado comparando los dos clientes).
    experimental: { passkey: true },
  },
})
