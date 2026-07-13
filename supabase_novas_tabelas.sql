-- ============================================
-- SCRIPT SQL - NOVAS TABELAS COMISSÃO IVC NORTE
-- Execute no SQL Editor do Supabase
-- ============================================

-- 1. TABELA: membros (Membros da Comissão)
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

-- 2. TABELA: avisos
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

-- 3. TABELA: liturgia (Liturgia diária)
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

-- 4. TABELA: catecismo
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

-- 5. TABELA: prestacao_contas (Prestação de contas)
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

-- 6. TABELA: inscricoes (Inscrições)
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

-- 7. TABELA: redes_sociais (Links das redes sociais)
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

-- 8. TABELA: oracoes (Orações)
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

-- ============================================
-- ADICIONAR COLUNAS NOVAS EM TABELAS EXISTENTES
-- ============================================

-- Adicionar coluna forania na tabela paroquias
ALTER TABLE paroquias ADD COLUMN IF NOT EXISTS forania TEXT;

-- Adicionar colunas de redes sociais na tabela app_config
ALTER TABLE app_config ADD COLUMN IF NOT EXISTS instagram_url TEXT;
ALTER TABLE app_config ADD COLUMN IF NOT EXISTS facebook_url TEXT;
ALTER TABLE app_config ADD COLUMN IF NOT EXISTS youtube_url TEXT;
ALTER TABLE app_config ADD COLUMN IF NOT EXISTS whatsapp_grupo TEXT;

-- ============================================
-- DADOS DE EXEMPLO
-- ============================================

INSERT INTO membros (nome, cargo, descricao, ordem) VALUES
('Pe. Carlos', 'Assessor Eclesiástico', 'Assessor espiritual da Comissão IVC Norte', 1),
('Maria Santos', 'Presidente', 'Presidente da Comissão IVC Norte', 2),
('João Oliveira', 'Vice-Presidente', 'Vice-presidente e coordenador de eventos', 3);

INSERT INTO avisos (titulo, conteudo, tipo) VALUES
('Próximo Encontro', 'O encontro mensal será no dia 15 de outubro na Paróquia Matriz.', 'importante'),
('Formação de Líderes', 'Inscrições abertas para o curso de formação de líderes comunitários.', 'geral');

INSERT INTO oracoes (titulo, conteudo, categoria) VALUES
('Pai Nosso', 'Pai nosso, que estais nos céus, santificado seja o vosso nome...', 'cotidiana'),
('Ave Maria', 'Ave Maria, cheia de graça, o Senhor é convosco...', 'cotidiana');

INSERT INTO catecismo (titulo, conteudo, categoria) VALUES
('O que são os Sacramentos?', 'Os sacramentos são sinais sagrados que nos aproximam de Deus.', 'sacramentos'),
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
