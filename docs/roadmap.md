# ROADMAP — Site Fernando Wallace
**Leal Systems · Projeto Cliente**
**Versão:** 1.0 · **Data:** Maio 2026
**Prazo total estimado:** ~4 semanas do briefing ao go live

---

## Visão Geral das Fases

| Fase | Nome | Prazo |
|---|---|---|
| 1 | Briefing & Aprovação | 3–5 dias |
| 2 | Design & Layout | 1 semana |
| 3 | Desenvolvimento | 1–2 semanas |
| 4 | Conteúdo Real & Revisão | 3–5 dias |
| 5 | Deploy, SEO & Entrega | 2 dias |

---

## Fase 1 — Briefing & Aprovação
**Prazo:** 3–5 dias
**Responsável:** André Leal (Leal Systems) + Fernando Wallace

### Objetivo
Alinhar visão do projeto, coletar todo o conteúdo necessário e fechar as decisões técnicas antes de iniciar o design.

### Tarefas
- [ ] Apresentar o `visao.md` para Fernando Wallace
- [ ] Alinhar tom desejado: portfólio pessoal x profissional x pré-político
- [ ] Coletar checklist de conteúdo completo (ver `visao.md` Seção 10)
- [ ] Definir domínio (verificar disponibilidade de `fernandowallace.com.br`)
- [ ] Confirmar stack técnica: Opção A (HTML puro/Hostinger) ou Opção B (Next.js/Vercel)
- [ ] Confirmar uso de "Dr." no contexto farmacêutico
- [ ] Alinhar nível de visibilidade pública do site

### Entregáveis
- Checklist de conteúdo preenchido por Fernando
- Domínio registrado
- Stack técnica confirmada
- Briefing final assinado/aprovado

### Critério de Saída
> Fernando aprovou a visão e entregou pelo menos 80% do checklist de conteúdo. Domínio registrado.

---

## Fase 2 — Design & Layout
**Prazo:** 1 semana
**Responsável:** André Leal (Leal Systems)

### Objetivo
Construir o layout completo em HTML/CSS com conteúdo placeholder, aplicar a identidade visual e obter aprovação visual do cliente antes de codificar a interatividade.

### Tarefas
- [ ] Aplicar paleta de cores definida (`#0B1F3A`, `#1FA67A`, `#C9A646`, `#F7FAFC`)
- [ ] Configurar tipografia: Playfair Display + Source Sans 3 (Google Fonts)
- [ ] Desenvolver seção Hero (foto placeholder + nome + tagline + CTAs)
- [ ] Desenvolver seção Sobre + Timeline
- [ ] Desenvolver seção Gestão Pública (6 cards de ação)
- [ ] Desenvolver seção Formação
- [ ] Desenvolver seção Agenda & Notícias
- [ ] Desenvolver seção Galeria (grid masonry + lightbox)
- [ ] Desenvolver seção Contato (formulário + mapa)
- [ ] Desenvolver Header (menu sticky) e Footer
- [ ] Testar layout em mobile (375px) e tablet (768px)
- [ ] Apresentar para Fernando → coletar feedback visual
- [ ] Aplicar ajustes do feedback

### Entregáveis
- Layout completo com todas as seções visíveis
- Aprovação visual do cliente registrada

### Critério de Saída
> Fernando aprovou o design. Nenhuma seção com estrutura pendente.

---

## Fase 3 — Desenvolvimento
**Prazo:** 1–2 semanas
**Responsável:** André Leal (Leal Systems)

### Objetivo
Implementar todas as funcionalidades interativas, integrações e garantir performance e responsividade completas.

### Tarefas

**Seções e interatividade**
- [ ] Lightbox funcional na galeria de fotos (Glightbox ou nativo)
- [ ] Lightbox para diplomas (se Fernando autorizar)
- [ ] Filtro de categorias na seção Notícias (JS puro)
- [ ] Carrossel de depoimentos (Splide.js leve)
- [ ] Animações de entrada suaves (IntersectionObserver + CSS)
- [ ] Smooth scroll entre seções
- [ ] Menu mobile (drawer lateral com animação)
- [ ] Botão WhatsApp flutuante com pulso

**Formulário e integrações**
- [ ] Formulário de contato integrado com Formspree
- [ ] Validação de campos (nome, e-mail, mensagem)
- [ ] Mensagem de sucesso/erro após envio
- [ ] Embed Google Maps (endereço da Secretaria)
- [ ] Google Analytics 4 configurado

**Performance e SEO técnico**
- [ ] Converter todas as imagens para WebP
- [ ] Lazy loading em todas as imagens
- [ ] Meta tags completas (title, description, keywords)
- [ ] Open Graph (Facebook/WhatsApp) e Twitter Card
- [ ] Schema.org `Person` + `GovernmentOrganization`
- [ ] Favicon + Apple Touch Icon
- [ ] sitemap.xml gerado
- [ ] robots.txt configurado

**Qualidade**
- [ ] Testar em Chrome, Firefox, Safari
- [ ] Testar em iPhone (375px) e Android
- [ ] Validar HTML no W3C Validator
- [ ] Testar velocidade no PageSpeed Insights (meta: >90 mobile)
- [ ] Verificar todos os links e âncoras

### Entregáveis
- Site completo, funcional e responsivo em ambiente local/staging
- Relatório de PageSpeed

### Critério de Saída
> Todas as funcionalidades operando. Score PageSpeed mobile ≥ 85. Zero links quebrados.

---

## Fase 4 — Conteúdo Real & Revisão
**Prazo:** 3–5 dias
**Responsável:** André Leal (inserção) + Fernando Wallace (aprovação)

### Objetivo
Substituir todo o conteúdo placeholder pelo conteúdo real entregue por Fernando. Revisão final de texto, imagem e funcionamento.

### Tarefas
- [ ] Inserir foto profissional principal (Hero)
- [ ] Inserir fotos adicionais (galeria: reuniões, eventos, unidades de saúde)
- [ ] Inserir texto "Sobre Fernando" revisado
- [ ] Inserir timeline da trajetória com datas reais
- [ ] Inserir cards de Gestão Pública com descrições reais
- [ ] Inserir dados de formação (instituição, período, CRF/RJ)
- [ ] Inserir notícias reais (com links para fontes: Prefeitura, CRF/RJ, Rede TV Mais)
- [ ] Inserir depoimentos aprovados (com autorização de uso)
- [ ] Inserir contatos reais (WhatsApp, e-mail, endereço)
- [ ] Revisar todos os textos (português, ortografia, tom)
- [ ] Enviar link de staging para Fernando revisar
- [ ] Aplicar ajustes finais solicitados por Fernando
- [ ] Obter aprovação formal para deploy

### Entregáveis
- Site com 100% do conteúdo real
- Aprovação formal do Fernando para go live

### Critério de Saída
> Fernando enviou aprovação formal. Nenhum placeholder visível. Textos revisados.

---

## Fase 5 — Deploy, SEO & Entrega
**Prazo:** 2 dias
**Responsável:** André Leal (Leal Systems)

### Objetivo
Publicar o site no domínio definitivo, ativar monitoramento e entregar o projeto formalmente.

### Tarefas

**Deploy**
- [ ] Contratar/configurar hospedagem na Hostinger (se ainda não ativa)
- [ ] Upload dos arquivos via FTP ou Git
- [ ] Apontar domínio `fernandowallace.com.br` para a Hostinger (DNS)
- [ ] Configurar SSL/HTTPS (Let's Encrypt gratuito na Hostinger)
- [ ] Verificar funcionamento completo no domínio definitivo

**SEO pós-deploy**
- [ ] Cadastrar site no Google Search Console
- [ ] Enviar sitemap.xml ao Search Console
- [ ] Verificar indexação inicial (solicitar crawl)
- [ ] Criar/otimizar perfil no Google Meu Negócio (orientar Fernando)

**Monitoramento**
- [ ] Confirmar GA4 recebendo dados reais
- [ ] Configurar alerta de indisponibilidade (UptimeRobot gratuito)

**Entrega formal**
- [ ] Documentar credenciais: Hostinger, domínio, Formspree, GA4
- [ ] Entregar documento de uso: como atualizar fotos/notícias manualmente
- [ ] Apresentar relatório de entrega para Fernando
- [ ] Emitir nota fiscal / formalizar pagamento

### Entregáveis
- Site no ar em `fernandowallace.com.br` com HTTPS
- Google Search Console ativo
- Documento de credenciais entregue ao cliente
- Relatório de entrega

### Critério de Saída
> Site acessível no domínio final com HTTPS. Search Console ativo. Entrega formal concluída.

---

## Pós-entrega — Evolução Futura (Backlog)

Itens fora do escopo inicial, mas planejados para versões futuras:

| Item | Descrição | Complexidade |
|---|---|---|
| CMS (Sanity.io) | Fernando atualiza notícias sem programar | Média |
| Blog / Artigos | Conteúdo educativo para SEO de longo prazo | Alta |
| Versão Next.js | Migração para stack moderna com melhor DX | Alta |
| Área de depoimentos dinâmica | Formulário para coleta de novos depoimentos | Baixa |
| Newsletter | Captura de e-mails para lista de contatos | Baixa |
| Multilíngue (PT/EN) | Para eventos e congressos internacionais | Alta |

---

## Resumo de Responsabilidades

| Responsável | Papel |
|---|---|
| **André Leal (Leal Systems)** | Design, desenvolvimento, deploy, SEO técnico |
| **Fernando Wallace** | Aprovações, entrega de conteúdo, feedback |
| **Assessoria de Fernando** *(se houver)* | Suporte na coleta de fotos e textos |

---

## Riscos e Mitigações

| Risco | Probabilidade | Mitigação |
|---|---|---|
| Fernando demora a entregar conteúdo | Alta | Prosseguir com placeholder; prazo da Fase 4 começa após entrega |
| Fotos em baixa qualidade | Média | Orientar sobre foto profissional antes de iniciar |
| Domínio indisponível | Baixa | Já mapeadas 5 opções alternativas no `visao.md` |
| Solicitação de mudanças grandes após aprovação | Média | Máximo 2 rodadas de revisão no escopo; extras são cobrados |
| Conteúdo jurídico sensível (depoimentos, "Dr.") | Baixa | Revisão com Fernando antes de publicar |

---

*Documento gerado por Leal Systems · André Leal — CEO*
*Todos os direitos reservados · Uso interno e apresentação ao cliente · Confidencial*