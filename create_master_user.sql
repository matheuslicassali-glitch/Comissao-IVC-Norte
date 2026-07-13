-- ============================================
-- CRIAR USUARIO MASTER NO SUPABASE
-- Execute no SQL Editor
-- ============================================

-- Habilitar extensao pgcrypto (se nao estiver habilitada)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Criar usuario master na tabela auth.users
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    confirmation_token,
    recovery_token,
    email_change_token_new,
    email_change
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'master@gmail.com',
    crypt('Alfa1234@', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
) ON CONFLICT (email) DO NOTHING;

-- Criar identity para o usuario
INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
) VALUES (
    gen_random_uuid(),
    (SELECT id FROM auth.users WHERE email = 'master@gmail.com'),
    '{"sub": "' || (SELECT id FROM auth.users WHERE email = 'master@gmail.com')::text || '", "email": "master@gmail.com"}',
    'email',
    NOW(),
    NOW(),
    NOW()
) ON CONFLICT DO NOTHING;

-- Criar session para o usuario
INSERT INTO auth.sessions (
    id,
    user_id,
    created_at,
    updated_at,
    factor_id,
    aal,
    not_after
) VALUES (
    gen_random_uuid(),
    (SELECT id FROM auth.users WHERE email = 'master@gmail.com'),
    NOW(),
    NOW(),
    NULL,
    'aal1',
    NULL
) ON CONFLICT DO NOTHING;

-- Verificar se o usuario foi criado
SELECT id, email, role, created_at FROM auth.users WHERE email = 'master@gmail.com';
