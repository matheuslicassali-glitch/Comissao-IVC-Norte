-- ============================================
-- SCRIPT SQL PARA SUPABASE - COMISSÃO IVC NORTE
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- 1. TABELA: noticias (Slides da página inicial)
CREATE TABLE IF NOT EXISTS noticias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo TEXT NOT NULL,
    resumo TEXT,
    imagem_url TEXT,
    link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE noticias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura pública de noticias" ON noticias
    FOR SELECT USING (true);

CREATE POLICY "Permitir escrita para autenticados em noticias" ON noticias
    FOR ALL USING (auth.role() = 'authenticated');


-- 2. TABELA: eventos
CREATE TABLE IF NOT EXISTS eventos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    descricao TEXT,
    data_hora TIMESTAMP WITH TIME ZONE NOT NULL,
    local TEXT,
    imagem_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE eventos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura pública de eventos" ON eventos
    FOR SELECT USING (true);

CREATE POLICY "Permitir escrita para autenticados em eventos" ON eventos
    FOR ALL USING (auth.role() = 'authenticated');


-- 3. TABELA: paroquias
CREATE TABLE IF NOT EXISTS paroquias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    endereco TEXT,
    telefone TEXT,
    email TEXT,
    padre TEXT,
    horarios TEXT,
    imagem_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE paroquias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura pública de paroquias" ON paroquias
    FOR SELECT USING (true);

CREATE POLICY "Permitir escrita para autenticados em paroquias" ON paroquias
    FOR ALL USING (auth.role() = 'authenticated');


-- 4. TABELA: pastorais (Comissões e pastorais)
CREATE TABLE IF NOT EXISTS pastorais (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    descricao TEXT,
    responsavel TEXT,
    contato TEXT,
    imagem_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE pastorais ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura pública de pastorais" ON pastorais
    FOR SELECT USING (true);

CREATE POLICY "Permitir escrita para autenticados em pastorais" ON pastorais
    FOR ALL USING (auth.role() = 'authenticated');


-- 5. TABELA: app_config (Configurações gerais)
CREATE TABLE IF NOT EXISTS app_config (
    id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    telefone_secretaria TEXT,
    email_secretaria TEXT,
    endereco_secretaria TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE app_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura pública de app_config" ON app_config
    FOR SELECT USING (true);

CREATE POLICY "Permitir escrita para autenticados em app_config" ON app_config
    FOR ALL USING (auth.role() = 'authenticated');

INSERT INTO app_config (id, telefone_secretaria, email_secretaria, endereco_secretaria)
VALUES (
    1,
    '(00) 0000-0000',
    'contato@comissaoivcnorte.com.br',
    'Diocese de Campos - RJ'
)
ON CONFLICT (id) DO NOTHING;


-- ============================================
-- DADOS DE EXEMPLO (OPCIONAL)
-- ============================================

INSERT INTO noticias (titulo, resumo, imagem_url) VALUES
    ('Bem-vindos à Comissão IVC Norte', 'Conheça nosso trabalho na Diocese de Campos', 'https://picsum.photos/seed/welcome/600/400'),
    ('Encontro Regional', 'Participe do próximo encontro das comunidades', 'https://picsum.photos/seed/encontro/600/400');

INSERT INTO eventos (nome, descricao, data_hora, local, imagem_url) VALUES
    ('Encontro IVC Norte', 'Reunião das lideranças regionais.', '2026-10-12 18:00:00+00', 'Paróquia Matriz', 'https://picsum.photos/seed/ivc/600/400'),
    ('Formação de Líderes', 'Capacitação para líderes comunitários.', '2026-11-05 08:00:00+00', 'Salão Paroquial', 'https://picsum.photos/seed/formacao/600/400');

INSERT INTO paroquias (nome, endereco, telefone, padre, horarios) VALUES
    ('Paróquia Matriz', 'Centro - Campos', '(00) 0000-0000', 'Pe. João', 'Domingos 09:00 e 19:00'),
    ('Paróquia São José', 'Bela Vista - Campos', '(00) 0000-0000', 'Pe. Maria', 'Domingos 08:00 e 18:00');

INSERT INTO pastorais (nome, descricao, responsavel) VALUES
    ('Comissão Litúrgica', 'Organização das celebrações', 'Grupo de Liturgia'),
    ('Pastoral da Criança', 'Acolhimento e catequese infantil', 'Equipe de Catequese');


-- ============================================
-- FIM DO SCRIPT
-- ============================================
