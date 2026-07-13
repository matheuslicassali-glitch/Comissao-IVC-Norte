import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import { Evento, Noticia, AgendaItem, InstagramPost, Oracao, Capela, Pastoral, Produto } from '../../types';

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    section: string;
    initialData: any;
    onSave: (data: any) => Promise<void>;
}

const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, section, initialData, onSave }) => {
    const [formData, setFormData] = useState<any>({});
    const [uploadingImage, setUploadingImage] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({ ...initialData });
        } else {
            setFormData({});
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `noticias/${fileName}`;

        setUploadingImage(true);
        try {
            const { error: uploadError } = await supabase.storage.from('imagens').upload(filePath, file);
            if (uploadError) throw uploadError;

            const { data: publicURLData } = supabase.storage.from('imagens').getPublicUrl(filePath);
            setFormData((prev: any) => ({ ...prev, imagem_url: publicURLData.publicUrl }));
        } catch (error: any) {
            alert('Erro ao fazer upload da imagem: ' + error.message + " (Verifique se o bucket 'imagens' existe e é público)");
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative flex flex-col max-h-[85vh] overflow-hidden">
                {/* Header Fixado */}
                <div className="p-5 border-b border-gray-100 flex-none bg-white">
                    <h2 className="text-xl font-bold text-[#1E3A8A]">
                        {formData.id ? 'Editar Item' : 'Novo Item'} ({section})
                    </h2>
                </div>

                {/* Conteúdo com Scroll */}
                <div className="p-5 overflow-y-auto flex-1">
                    <form id="edit-form" onSubmit={handleSubmit} className="space-y-4">
                        {section === 'home' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                                    <input
                                        required
                                        className="w-full border p-2 rounded-lg"
                                        value={formData.titulo || ''}
                                        onChange={e => setFormData({ ...formData, titulo: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Resumo (opcional)</label>
                                    <textarea
                                        className="w-full border p-2 rounded-lg"
                                        value={formData.resumo || ''}
                                        onChange={e => setFormData({ ...formData, resumo: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Link/Botão (opcional)</label>
                                    <input
                                        className="w-full border p-2 rounded-lg"
                                        value={formData.link || ''}
                                        onChange={e => setFormData({ ...formData, link: e.target.value })}
                                    />
                                </div>
                            </>
                        )}

                        {section === 'eventos' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Evento</label>
                                    <input
                                        required
                                        className="w-full border p-2 rounded-lg"
                                        value={formData.nome || ''}
                                        onChange={e => setFormData({ ...formData, nome: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Data e Hora</label>
                                        <input
                                            type="datetime-local"
                                            required
                                            className="w-full border p-2 rounded-lg"
                                            value={formData.data_hora ? formData.data_hora.slice(0, 16) : ''}
                                            onChange={e => setFormData({ ...formData, data_hora: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Local</label>
                                        <input
                                            className="w-full border p-2 rounded-lg"
                                            value={formData.local || ''}
                                            onChange={e => setFormData({ ...formData, local: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição Curta (para a lista)</label>
                                    <textarea
                                        rows={2}
                                        className="w-full border p-2 rounded-lg"
                                        value={formData.descricao || ''}
                                        onChange={e => setFormData({ ...formData, descricao: e.target.value })}
                                        placeholder="Breve resumo que aparece nos cards..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Informações Detalhadas (para a página do evento)</label>
                                    <textarea
                                        rows={5}
                                        className="w-full border p-2 rounded-lg"
                                        value={formData.detalhes || ''}
                                        onChange={e => setFormData({ ...formData, detalhes: e.target.value })}
                                        placeholder="Conteúdo completo, programação, observações..."
                                    />
                                </div>
                            </>
                        )}

                        {section === 'agenda' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                                    <input
                                        required
                                        className="w-full border p-2 rounded-lg"
                                        value={formData.titulo || ''}
                                        onChange={e => setFormData({ ...formData, titulo: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Dia da Semana</label>
                                        <select
                                            required
                                            className="w-full border p-2 rounded-lg"
                                            value={formData.dia ?? 0}
                                            onChange={e => setFormData({ ...formData, dia: parseInt(e.target.value) })}
                                        >
                                            {diasSemana.map((d, idx) => <option key={idx} value={idx}>{d}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Horário</label>
                                        <input
                                            type="time"
                                            required
                                            className="w-full border p-2 rounded-lg"
                                            value={formData.horario || ''}
                                            onChange={e => setFormData({ ...formData, horario: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                                    <select
                                        className="w-full border p-2 rounded-lg"
                                        value={formData.tipo || 'outro'}
                                        onChange={e => setFormData({ ...formData, tipo: e.target.value })}
                                    >
                                        <option value="missa">Missa</option>
                                        <option value="reuniao">Reunião</option>
                                        <option value="outro">Outro</option>
                                    </select>
                                </div>
                            </>
                        )}

                        {section === 'instagram' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">URL do Post</label>
                                    <input
                                        required
                                        className="w-full border p-2 rounded-lg"
                                        value={formData.url_post || ''}
                                        onChange={e => setFormData({ ...formData, url_post: e.target.value })}
                                        placeholder="https://instagram.com/p/..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Legenda</label>
                                    <textarea
                                        rows={3}
                                        className="w-full border p-2 rounded-lg"
                                        value={formData.legenda || ''}
                                        onChange={e => setFormData({ ...formData, legenda: e.target.value })}
                                        placeholder="Descrição do post..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Data de Publicação</label>
                                    <input
                                        type="datetime-local"
                                        className="w-full border p-2 rounded-lg"
                                        value={formData.data_publicacao ? formData.data_publicacao.slice(0, 16) : ''}
                                        onChange={e => setFormData({ ...formData, data_publicacao: e.target.value })}
                                    />
                                </div>
                            </>
                        )}

                        {section === 'oracoes' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Título da Oração</label>
                                    <input
                                        required
                                        className="w-full border p-2 rounded-lg"
                                        value={formData.titulo || ''}
                                        onChange={e => setFormData({ ...formData, titulo: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo/Texto</label>
                                    <textarea
                                        rows={6}
                                        required
                                        className="w-full border p-2 rounded-lg"
                                        value={formData.conteudo || ''}
                                        onChange={e => setFormData({ ...formData, conteudo: e.target.value })}
                                    />
                                </div>
                            </>
                        )}

                        {section === 'capelas' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Capela</label>
                                    <input required className="w-full border p-2 rounded-lg" value={formData.nome || ''} onChange={e => setFormData({ ...formData, nome: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Padroeiro</label>
                                    <input required className="w-full border p-2 rounded-lg" value={formData.padroeiro || ''} onChange={e => setFormData({ ...formData, padroeiro: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                                    <input className="w-full border p-2 rounded-lg" value={formData.endereco || ''} onChange={e => setFormData({ ...formData, endereco: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                                    <textarea rows={3} className="w-full border p-2 rounded-lg" value={formData.descricao || ''} onChange={e => setFormData({ ...formData, descricao: e.target.value })} />
                                </div>
                            </>
                        )}

                        {section === 'pastorais' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Pastoral</label>
                                    <input required className="w-full border p-2 rounded-lg" value={formData.nome || ''} onChange={e => setFormData({ ...formData, nome: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Coordenador</label>
                                    <input className="w-full border p-2 rounded-lg" value={formData.coordenador || ''} onChange={e => setFormData({ ...formData, coordenador: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Horário de Reuniões</label>
                                    <input className="w-full border p-2 rounded-lg" value={formData.reunioes || ''} onChange={e => setFormData({ ...formData, reunioes: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Destaque (ex: 'Inscrições Abertas')</label>
                                    <input className="w-full border p-2 rounded-lg" value={formData.destaque || ''} onChange={e => setFormData({ ...formData, destaque: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                                    <textarea rows={3} className="w-full border p-2 rounded-lg" value={formData.descricao || ''} onChange={e => setFormData({ ...formData, descricao: e.target.value })} />
                                </div>
                            </>
                        )}

                        {section === 'loja' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
                                    <input required className="w-full border p-2 rounded-lg" value={formData.nome || ''} onChange={e => setFormData({ ...formData, nome: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
                                    <input type='number' step="0.01" required className="w-full border p-2 rounded-lg" value={formData.preco || ''} onChange={e => setFormData({ ...formData, preco: parseFloat(e.target.value) })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                                    <textarea rows={3} className="w-full border p-2 rounded-lg" value={formData.descricao || ''} onChange={e => setFormData({ ...formData, descricao: e.target.value })} />
                                </div>
                            </>
                        )}

                        {section === 'usuarios' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">E-mail do Novo Admin</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full border p-2 rounded-lg"
                                        value={formData.email || ''}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="novo_admin@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Senha Provisória</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full border p-2 rounded-lg"
                                        value={formData.password || ''}
                                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="Mínimo 6 caracteres"
                                    />
                                </div>
                                <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                                    ⚠️ Importante: Salve esta senha. Por segurança, não é possível vê-la novamente.
                                </div>
                            </>
                        )}

                        {section === 'membros' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                                    <input required className="w-full border p-2 rounded-lg" value={formData.nome || ''} onChange={e => setFormData({ ...formData, nome: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                                    <input required className="w-full border p-2 rounded-lg" value={formData.cargo || ''} onChange={e => setFormData({ ...formData, cargo: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                                    <textarea rows={3} className="w-full border p-2 rounded-lg" value={formData.descricao || ''} onChange={e => setFormData({ ...formData, descricao: e.target.value })} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                                        <input type="email" className="w-full border p-2 rounded-lg" value={formData.email || ''} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                                        <input className="w-full border p-2 rounded-lg" value={formData.telefone || ''} onChange={e => setFormData({ ...formData, telefone: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ordem (para ordenação)</label>
                                    <input type="number" className="w-full border p-2 rounded-lg" value={formData.ordem || 0} onChange={e => setFormData({ ...formData, ordem: parseInt(e.target.value) })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Foto</label>
                                    <input type="file" accept="image/*" onChange={async (e) => {
                                        if (!e.target.files || e.target.files.length === 0) return;
                                        const file = e.target.files[0];
                                        const fileExt = file.name.split('.').pop();
                                        const fileName = `${Math.random()}.${fileExt}`;
                                        setUploadingImage(true);
                                        try {
                                            const { error } = await supabase.storage.from('imagens').upload(`membros/${fileName}`, file);
                                            if (error) throw error;
                                            const { data } = supabase.storage.from('imagens').getPublicUrl(`membros/${fileName}`);
                                            setFormData((prev: any) => ({ ...prev, foto_url: data.publicUrl }));
                                        } catch (err: any) {
                                            alert('Erro ao enviar foto: ' + err.message);
                                        } finally {
                                            setUploadingImage(false);
                                        }
                                    }} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                                    {uploadingImage && <p className="text-xs text-blue-600 mt-1">Enviando foto...</p>}
                                    {formData.foto_url && <img src={formData.foto_url} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded-full bg-slate-100" />}
                                </div>
                            </>
                        )}

                        {section === 'avisos' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                                    <input required className="w-full border p-2 rounded-lg" value={formData.titulo || ''} onChange={e => setFormData({ ...formData, titulo: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                                    <select className="w-full border p-2 rounded-lg" value={formData.tipo || 'geral'} onChange={e => setFormData({ ...formData, tipo: e.target.value })}>
                                        <option value="geral">Geral</option>
                                        <option value="importante">Importante</option>
                                        <option value="urgente">Urgente</option>
                                        <option value="evento">Evento</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo</label>
                                    <textarea rows={4} required className="w-full border p-2 rounded-lg" value={formData.conteudo || ''} onChange={e => setFormData({ ...formData, conteudo: e.target.value })} />
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="publicado" checked={formData.publicado !== false} onChange={e => setFormData({ ...formData, publicado: e.target.checked })} className="rounded" />
                                    <label htmlFor="publicado" className="text-sm text-gray-700">Publicado</label>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Imagem (opcional)</label>
                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                                    {uploadingImage && <p className="text-xs text-blue-600 mt-1">Enviando imagem...</p>}
                                    {formData.imagem_url && <img src={formData.imagem_url} alt="Preview" className="mt-2 h-20 w-fit object-cover rounded bg-slate-100" />}
                                </div>
                            </>
                        )}

                        {section === 'liturgia' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                                    <input type="date" required className="w-full border p-2 rounded-lg" value={formData.data || ''} onChange={e => setFormData({ ...formData, data: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Primeira Leitura</label>
                                    <textarea rows={2} className="w-full border p-2 rounded-lg" value={formData.primeira_leitura || ''} onChange={e => setFormData({ ...formData, primeira_leitura: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Salmo</label>
                                    <textarea rows={2} className="w-full border p-2 rounded-lg" value={formData.salmo || ''} onChange={e => setFormData({ ...formData, salmo: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Segunda Leitura</label>
                                    <textarea rows={2} className="w-full border p-2 rounded-lg" value={formData.segunda_leitura || ''} onChange={e => setFormData({ ...formData, segunda_leitura: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Evangelho</label>
                                    <textarea rows={3} className="w-full border p-2 rounded-lg" value={formData.evangelho || ''} onChange={e => setFormData({ ...formData, evangelho: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Oração</label>
                                    <textarea rows={3} className="w-full border p-2 rounded-lg" value={formData.oracao || ''} onChange={e => setFormData({ ...formData, oracao: e.target.value })} />
                                </div>
                            </>
                        )}

                        {section === 'catecismo' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                                    <input required className="w-full border p-2 rounded-lg" value={formData.titulo || ''} onChange={e => setFormData({ ...formData, titulo: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                                    <input className="w-full border p-2 rounded-lg" value={formData.categoria || ''} onChange={e => setFormData({ ...formData, categoria: e.target.value })} placeholder="ex: sacramentos, mandamentos, orações" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo</label>
                                    <textarea rows={6} required className="w-full border p-2 rounded-lg" value={formData.conteudo || ''} onChange={e => setFormData({ ...formData, conteudo: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ordem (para ordenação)</label>
                                    <input type="number" className="w-full border p-2 rounded-lg" value={formData.ordem || 0} onChange={e => setFormData({ ...formData, ordem: parseInt(e.target.value) })} />
                                </div>
                            </>
                        )}

                        {section === 'prestacao' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                                    <input required className="w-full border p-2 rounded-lg" value={formData.titulo || ''} onChange={e => setFormData({ ...formData, titulo: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                                    <textarea rows={2} className="w-full border p-2 rounded-lg" value={formData.descricao || ''} onChange={e => setFormData({ ...formData, descricao: e.target.value })} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
                                        <input type="number" step="0.01" required className="w-full border p-2 rounded-lg" value={formData.valor || ''} onChange={e => setFormData({ ...formData, valor: parseFloat(e.target.value) })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                                        <select className="w-full border p-2 rounded-lg" value={formData.tipo || 'entrada'} onChange={e => setFormData({ ...formData, tipo: e.target.value })}>
                                            <option value="entrada">Entrada</option>
                                            <option value="saida">Saída</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                                    <input type="date" required className="w-full border p-2 rounded-lg" value={formData.data || ''} onChange={e => setFormData({ ...formData, data: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Comprovante (opcional)</label>
                                    <input className="w-full border p-2 rounded-lg" value={formData.comprovante_url || ''} onChange={e => setFormData({ ...formData, comprovante_url: e.target.value })} />
                                </div>
                            </>
                        )}

                        {section === 'inscricoes' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Evento</label>
                                    <input required className="w-full border p-2 rounded-lg" value={formData.evento_nome || ''} onChange={e => setFormData({ ...formData, evento_nome: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Link de Inscrição</label>
                                    <input required className="w-full border p-2 rounded-lg" value={formData.link_inscricao || ''} onChange={e => setFormData({ ...formData, link_inscricao: e.target.value })} placeholder="https://..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                                    <textarea rows={2} className="w-full border p-2 rounded-lg" value={formData.descricao || ''} onChange={e => setFormData({ ...formData, descricao: e.target.value })} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Vagas</label>
                                        <input type="number" className="w-full border p-2 rounded-lg" value={formData.vagas || ''} onChange={e => setFormData({ ...formData, vagas: parseInt(e.target.value) })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Data Limite</label>
                                        <input type="date" className="w-full border p-2 rounded-lg" value={formData.data_limite || ''} onChange={e => setFormData({ ...formData, data_limite: e.target.value })} />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="ativo" checked={formData.ativo !== false} onChange={e => setFormData({ ...formData, ativo: e.target.checked })} className="rounded" />
                                    <label htmlFor="ativo" className="text-sm text-gray-700">Ativo</label>
                                </div>
                            </>
                        )}

                        {section === 'redes' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                                    <input required className="w-full border p-2 rounded-lg" value={formData.nome || ''} onChange={e => setFormData({ ...formData, nome: e.target.value })} placeholder="Instagram, Facebook, YouTube..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                                    <input required className="w-full border p-2 rounded-lg" value={formData.url || ''} onChange={e => setFormData({ ...formData, url: e.target.value })} placeholder="https://..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ícone</label>
                                    <input className="w-full border p-2 rounded-lg" value={formData.icone || ''} onChange={e => setFormData({ ...formData, icone: e.target.value })} placeholder="instagram, facebook, youtube, whatsapp..." />
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="ativo-rede" checked={formData.ativo !== false} onChange={e => setFormData({ ...formData, ativo: e.target.checked })} className="rounded" />
                                    <label htmlFor="ativo-rede" className="text-sm text-gray-700">Ativo</label>
                                </div>
                            </>
                        )}

                        {['home', 'eventos', 'instagram', 'oracoes', 'capelas', 'pastorais', 'loja'].includes(section) && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Imagem</label>
                                <input type="file" onChange={handleImageUpload} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                                {uploadingImage && <p className="text-xs text-blue-600 mt-1">Enviando imagem...</p>}
                                {formData.imagem_url && (
                                    <img src={formData.imagem_url} alt="Preview" className="mt-2 h-20 w-fit object-cover rounded bg-slate-100" />
                                )}
                            </div>
                        )}
                    </form>
                </div>

                {/* Footer Fixado */}
                <div className="p-5 border-t border-gray-100 bg-gray-50 flex-none">
                    <div className="flex gap-4">
                        <button type="button" onClick={onClose} className="flex-1 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-xl" disabled={saving}>Cancelar</button>
                        <button type="submit" form="edit-form" className="flex-1 py-2 bg-[#1E3A8A] text-white font-bold rounded-xl hover:bg-[#1E3A8A]/90" disabled={saving || uploadingImage}>
                            {saving ? 'Salvando...' : 'Salvar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
