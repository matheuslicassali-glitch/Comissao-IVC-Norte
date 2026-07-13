-- ============================================
-- SCRIPT SQL COMPLETO - COMISSÃO IVC NORTE
-- Execute no SQL Editor do Supabase
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
CREATE POLICY "Permitir leitura pública" ON noticias FOR SELECT USING (true);
CREATE POLICY "Permitir escrita autenticados" ON noticias FOR ALL USING (auth.role() = 'authenticated');

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
CREATE POLICY "Permitir leitura pública" ON eventos FOR SELECT USING (true);
CREATE POLICY "Permitir escrita autenticados" ON eventos FOR ALL USING (auth.role() = 'authenticated');

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
    forania TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE paroquias ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir leitura pública" ON paroquias FOR SELECT USING (true);
CREATE POLICY "Permitir escrita autenticados" ON paroquias FOR ALL USING (auth.role() = 'authenticated');

-- 4. TABELA: pastorais
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
CREATE POLICY "Permitir leitura pública" ON pastorais FOR SELECT USING (true);
CREATE POLICY "Permitir escrita autenticados" ON pastorais FOR ALL USING (auth.role() = 'authenticated');

-- 5. TABELA: membros (Membros da Comissão)
CREATE TABLE IF NOT EXISTS membros (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    cargo TEXT NOT NULL,
    descricao TEXT,
    foto_url TEXT,
    email TEXT,
    telefone TEXT,
    ordem INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE membros ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir leitura pública" ON membros FOR SELECT USING (true);
CREATE POLICY "Permitir escrita autenticados" ON membros FOR ALL USING (auth.role() = 'authenticated');

-- 6. TABELA: avisos
CREATE TABLE IF NOT EXISTS avisos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    tipo TEXT DEFAULT 'geral' CHECK (tipo IN ('urgente', 'importante', 'geral', 'evento')),
    imagem_url TEXT,
    publicado BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE avisos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir leitura pública" ON avisos FOR SELECT USING (true);
CREATE POLICY "Permitir escrita autenticados" ON avisos FOR ALL USING (auth.role() = 'authenticated');

-- 7. TABELA: liturgia (Liturgia diária)
CREATE TABLE IF NOT EXISTS liturgia (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data DATE NOT NULL UNIQUE,
    primeira_leitura TEXT,
    salmo TEXT,
    segunda_leitura TEXT,
    evangelho TEXT,
    oracao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE liturgia ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir leitura pública" ON liturgia FOR SELECT USING (true);
CREATE POLICY "Permitir escrita autenticados" ON liturgia FOR ALL USING (auth.role() = 'authenticated');

-- 8. TABELA: catecismo
CREATE TABLE IF NOT EXISTS catecismo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    categoria TEXT DEFAULT 'geral',
    ordem INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE catecismo ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir leitura pública" ON catecismo FOR SELECT USING (true);
CREATE POLICY "Permitir escrita autenticados" ON catecismo FOR ALL USING (auth.role() = 'authenticated');

-- 9. TABELA: agenda (Agenda da comissão)
CREATE TABLE IF NOT EXISTS agenda (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo TEXT NOT NULL,
    horario TEXT NOT NULL,
    tipo TEXT DEFAULT 'outro' CHECK (tipo IN ('reuniao', 'evento', 'celebracao', 'outro')),
    dia INTEGER NOT NULL CHECK (dia >= 0 AND dia <= 6),
    data_especifica DATE,
    local TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE agenda ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir leitura pública" ON agenda FOR SELECT USING (true);
CREATE POLICY "Permitir escrita autenticados" ON agenda FOR ALL USING (auth.role() = 'authenticated');

-- 10. TABELA: prestacao_contas (Prestação de contas)
CREATE TABLE IF NOT EXISTS prestacao_contas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo TEXT NOT NULL,
    descricao TEXT,
    valor DECIMAL(10,2),
    tipo TEXT DEFAULT 'entrada' CHECK (tipo IN ('entrada', 'saida')),
    data DATE NOT NULL,
    comprovante_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE prestacao_contas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir leitura pública" ON prestacao_contas FOR SELECT USING (true);
CREATE POLICY "Permitir escrita autenticados" ON prestacao_contas FOR ALL USING (auth.role() = 'authenticated');

-- 11. TABELA: inscricoes (Inscrições)
CREATE TABLE IF NOT EXISTS inscricoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evento_nome TEXT NOT NULL,
    link_inscricao TEXT NOT NULL,
    data_limite DATE,
    vagas INTEGER,
    descricao TEXT,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE inscricoes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir leitura pública" ON inscricoes FOR SELECT USING (true);
CREATE POLICY "Permitir escrita autenticados" ON inscricoes FOR ALL USING (auth.role() = 'authenticated');

-- 12. TABELA: redes_sociais (Links das redes sociais)
CREATE TABLE IF NOT EXISTS redes_sociais (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    url TEXT NOT NULL,
    icone TEXT,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE redes_sociais ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir leitura pública" ON redes_sociais FOR SELECT USING (true);
CREATE POLICY "Permitir escrita autenticados" ON redes_sociais FOR ALL USING (auth.role() = 'authenticated');

-- 13. TABELA: oracoes (Orações)
CREATE TABLE IF NOT EXISTS oracoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    categoria TEXT DEFAULT 'geral',
    imagem_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE oracoes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir leitura pública" ON oracoes FOR SELECT USING (true);
CREATE POLICY "Permitir escrita autenticados" ON oracoes FOR ALL USING (auth.role() = 'authenticated');

-- 14. TABELA: app_config
CREATE TABLE IF NOT EXISTS app_config (
    id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    telefone_secretaria TEXT,
    email_secretaria TEXT,
    endereco_secretaria TEXT,
    instagram_url TEXT,
    facebook_url TEXT,
    youtube_url TEXT,
    whatsapp_grupo TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE app_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir leitura pública" ON app_config FOR SELECT USING (true);
CREATE POLICY "Permitir escrita autenticados" ON app_config FOR ALL USING (auth.role() = 'authenticated');

INSERT INTO app_config (id, telefone_secretaria, email_secretaria, endereco_secretaria)
VALUES (1, '(00) 0000-0000', 'contato@comissaoivcnorte.com.br', 'Diocese de Campos - RJ')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- DADOS DE EXEMPLO
-- ============================================

INSERT INTO noticias (titulo, resumo, imagem_url) VALUES
('Bem-vindos à Comissão IVC Norte', 'Conheça nosso trabalho na Diocese de Campos', 'https://picsum.photos/seed/welcome/600/400'),
('Encontro Regional', 'Participe do próximo encontro das comunidades', 'https://picsum.photos/seed/encontro/600/400');

INSERT INTO eventos (nome, descricao, data_hora, local, imagem_url) VALUES
('Encontro IVC Norte', 'Reunião das lideranças regionais.', '2026-10-12 18:00:00+00', 'Paróquia Matriz', 'https://picsum.photos/seed/ivc/600/400'),
('Formação de Líderes', 'Capacitação para líderes comunitários.', '2026-11-05 08:00:00+00', 'Salão Paroquial', 'https://picsum.photos/seed/formacao/600/400');

INSERT INTO paroquias (nome, endereco, telefone, padre, horarios, forania) VALUES
('Paróquia Matriz', 'Centro - Campos', '(00) 0000-0000', 'Pe. João', 'Domingos 09:00 e 19:00', 'Forania Centro'),
('Paróquia São José', 'Bela Vista - Campos', '(00) 0000-0000', 'Pe. Maria', 'Domingos 08:00 e 18:00', 'Forania Norte');

INSERT INTO membros (nome, cargo, descricao) VALUES
('Pe. Carlos', 'Assessor Eclesiástico', 'Assessor espiritual da Comissão IVC Norte'),
('Maria Santos', 'Presidente', 'Presidente da Comissão IVC Norte'),
('João Oliveira', 'Vice-Presidente', 'Vice-presidente e coordenador de eventos');

INSERT INTO avisos (titulo, conteudo, tipo) VALUES
('Próximo Encontro', 'O encontro mensal será no dia 15 de outubro na Paróquia Matriz.', 'importante'),
('Formação de Líderes', 'Inscrições abertas para o curso de formação de líderes comunitários.', 'geral');

INSERT INTO oracoes (titulo, conteudo, categoria) VALUES
('Pai Nosso', 'Pai nosso, que estais nos céus, santificado seja o vosso nome...', 'cotidiana'),
('Ave Maria', 'Ave Maria, cheia de graça, o Senhor é convosco...', 'cotidiana');

INSERT INTO catecismo (titulo, conteudo, categoria) VALUES
('O que é o Sacramentos?', 'Os sacramentais são sinais sagrados que prepararam os fiéis para receber os frutos dos sacramentos.', 'sacramentos'),
('Os Mandamentos', 'Amar a Deus sobre todas as coisas e ao próximo como a ti mesmo.', 'mandamentos');

INSERT INTO redes_sociais (nome, url, icone) VALUES
('Instagram', 'https://instagram.com/comissaoivcnorte', 'instagram'),
('Facebook', 'https://facebook.com/comissaoivcnorte', 'facebook'),
('YouTube', 'https://youtube.com/@comissaoivcnorte', 'youtube');

INSERT INTO inscricoes (evento_nome, link_inscricao, descricao, vagas) VALUES
('Encontro IVC Norte 2026', 'https://forms.google.com/inscricao', 'Inscrições para o encontro anual', 100);

-- ============================================
-- FIM DO SCRIPT
-- ============================================
