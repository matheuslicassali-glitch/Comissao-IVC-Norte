-- ============================================
-- CRIAR USUARIO MASTER NO SUPABASE
-- Execute no SQL Editor
-- ============================================

-- Habilitar extensao pgcrypto
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Verificar se o usuario ja existe
DO $
BEGIN
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'master@gmail.com') THEN
        INSERT INTO auth.users (
            instance_id, id, aud, role, email, encrypted_password,
            email_confirmed_at, created_at, updated_at,
            confirmation_token, recovery_token, email_change_token_new, email_change
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            gen_random_uuid(), 'authenticated', 'authenticated',
            'master@gmail.com',
            crypt('Alfa1234@', gen_salt('bf')),
            NOW(), NOW(), NOW(), '', '', '', ''
        );
    END IF;
END $;

-- Verificar se o identity ja existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM auth.identities WHERE provider = 'email' AND identity_data->>'email' = 'master@gmail.com') THEN
        INSERT INTO auth.identities (
            id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at
        ) VALUES (
            gen_random_uuid(),
            (SELECT id FROM auth.users WHERE email = 'master@gmail.com'),
            json_build_object('sub', (SELECT id FROM auth.users WHERE email = 'master@gmail.com')::text, 'email', 'master@gmail.com'),
            'email', NOW(), NOW(), NOW()
        );
    END IF;
END ;

-- Verificar usuario criado
SELECT id, email, role FROM auth.users WHERE email = 'master@gmail.com';
