import type { Locale } from '../lib/i18n';

export const caseSlugs = [
  'thin-file-credit-decision-engine',
  'subscription-analytics-dbt',
  'marketplace-event-lakehouse',
  'starbucks-promo-effectiveness-analysis',
  'retailer-segmentation-rfm-clustering',
  'hevy-workout-etl-pipeline',
] as const;

export type CaseSlug = (typeof caseSlugs)[number];

export const projectLinks: Record<CaseSlug, { repo: string; demo?: string }> = {
  'thin-file-credit-decision-engine': {
    repo: 'https://github.com/J0BS013/thin-file-credit-decision-engine',
    demo: 'https://thin-file-credit-decision.streamlit.app/',
  },
  'subscription-analytics-dbt': {
    repo: 'https://github.com/J0BS013/subscription-analytics-dbt',
    demo: 'https://subscription-analytics-dbt.streamlit.app/',
  },
  'marketplace-event-lakehouse': {
    repo: 'https://github.com/J0BS013/marketplace-event-lakehouse',
  },
  'starbucks-promo-effectiveness-analysis': {
    repo: 'https://github.com/J0BS013/starbucks-promo-effectiveness-analysis',
  },
  'retailer-segmentation-rfm-clustering': {
    repo: 'https://github.com/J0BS013/retailer-segmentation-rfm-clustering',
  },
  'hevy-workout-etl-pipeline': {
    repo: 'https://github.com/J0BS013/hevy-workout-etl-pipeline',
    demo: 'https://hevy-workout-dashboard-j0bs013.streamlit.app/',
  },
};

type Copy = {
  nav: { home: string; work: string; about: string; resume: string };
  skip: string;
  hero: {
    role: string;
    statement: string;
    detail: string;
    workCta: string;
    resumeCta: string;
  };
  sections: {
    selected: string;
    selectedIntro: string;
    scope: string;
    other: string;
    about: string;
    viewCase: string;
    repository: string;
    liveDemo: string;
    allWork: string;
  };
  scope: Array<{ title: string; body: string }>;
  aboutShort: string;
  workIntro: string;
  aboutTitle: string;
  aboutBody: string[];
  principlesTitle: string;
  principles: string[];
  timelineTitle: string;
  educationTitle: string;
  languagesTitle: string;
  languages: string;
  resumeTitle: string;
  resumeBody: string;
  resumeDownload: string;
  updated: string;
};

export const copy: Record<Locale, Copy> = {
  en: {
    nav: { home: 'Home', work: 'Work', about: 'About', resume: 'Résumé' },
    skip: 'Skip to content',
    hero: {
      role: 'Decision Scientist and Analytics Engineer',
      statement: 'I build data systems that people trust — and that actually get used.',
      detail: 'From metric definitions and reliable pipelines to experiments, risk models and business decisions.',
      workCta: 'View selected work',
      resumeCta: 'Download résumé',
    },
    sections: {
      selected: 'Selected work',
      selectedIntro: 'Three projects, each built around a decision and the evidence required to make it responsibly.',
      scope: 'How I work across the decision path',
      other: 'Applied case studies',
      about: 'About',
      viewCase: 'Read case study',
      repository: 'Repository',
      liveDemo: 'Live demo',
      allWork: 'View all work',
    },
    scope: [
      { title: 'Trusted data', body: 'Metric contracts, tested transformations, reconciliation and CI.' },
      { title: 'Decision models', body: 'Probability, calibration, expected value and explicit thresholds.' },
      { title: 'Business action', body: 'Policy, experimentation, monitoring and a clear cost of error.' },
    ],
    aboutShort: 'I am an Associate Decision Scientist at Capgemini, working with a global insurance client and international teams. My background combines analytics engineering, decision science and applied statistics. I start with the decision and its failure cost, then make the grain, metric and evidence explicit before optimizing the solution.',
    workIntro: 'A focused selection of decision science, analytics engineering and data engineering projects. Each case documents the question, trade-offs, evidence, a correction or rejected path, and what the work does not prove.',
    aboutTitle: 'Building evidence people can act on',
    aboutBody: [
      'I work at the intersection of analytics engineering, decision science and business strategy. Today I support a global insurance client at Capgemini, partnering with US-based product and business teams in English. Previously, I built data products and executive analytics for AB InBev’s BEES marketplace across Latin America.',
      'My preferred working style is deliberately explicit: define the decision, quantify the cost of being wrong, verify the data grain, and reconcile the metric before optimizing a model or dashboard. That discipline has shaped projects ranging from subscription revenue and event pipelines to credit policy, segmentation and experimentation.',
      'I hold a specialization in Applied Statistics and a degree in Systems Analysis and Development. I enjoy translating technical constraints into decisions that business and engineering teams can inspect together.',
    ],
    principlesTitle: 'Working principles',
    principles: [
      'Start with the decision and the cost of error.',
      'Validate grain, metric and reconciliation before optimization.',
      'Separate observed evidence, synthetic scenarios and causal claims.',
      'Document limitations close to the result they qualify.',
    ],
    timelineTitle: 'Experience',
    educationTitle: 'Education',
    languagesTitle: 'Languages',
    languages: 'Portuguese — native · English — fluent · Spanish — intermediate',
    resumeTitle: 'Résumé',
    resumeBody: 'A concise record of my experience in decision science, analytics engineering and business intelligence. The public version omits private contact details and confidential client information.',
    resumeDownload: 'Download PDF résumé',
    updated: 'Updated September 2026',
  },
  'pt-br': {
    nav: { home: 'Início', work: 'Projetos', about: 'Sobre', resume: 'Currículo' },
    skip: 'Pular para o conteúdo',
    hero: {
      role: 'Decision Scientist e Analytics Engineer',
      statement: 'Construo sistemas de dados confiáveis e que as pessoas realmente usam.',
      detail: 'Da definição de métricas e dos pipelines até experimentos, modelos de risco e decisões de negócio.',
      workCta: 'Ver projetos',
      resumeCta: 'Baixar currículo',
    },
    sections: {
      selected: 'Projetos selecionados',
      selectedIntro: 'Três projetos organizados pela decisão e pela evidência necessária para tomá-la com responsabilidade.',
      scope: 'Como atuo ao longo da decisão',
      other: 'Cases aplicados',
      about: 'Sobre',
      viewCase: 'Ler estudo de caso',
      repository: 'Repositório',
      liveDemo: 'Demo ao vivo',
      allWork: 'Ver todos os projetos',
    },
    scope: [
      { title: 'Dados confiáveis', body: 'Contratos de métricas, transformações testadas, reconciliação e CI.' },
      { title: 'Modelos de decisão', body: 'Probabilidade, calibração, valor esperado e thresholds explícitos.' },
      { title: 'Ação de negócio', body: 'Política, experimento, monitoramento e custo do erro bem definido.' },
    ],
    aboutShort: 'Sou Associate Decision Scientist na Capgemini e trabalho com um cliente global de seguros e equipes internacionais. Minha trajetória combina analytics engineering, decision science e estatística aplicada. Começo pela decisão e pelo custo do erro; depois torno explícitos o grão, a métrica e a evidência antes de otimizar a solução.',
    workIntro: 'Uma seleção focada de projetos de decision science, analytics engineering e data engineering. Cada case documenta a pergunta, os trade-offs, as evidências, uma correção ou caminho rejeitado e aquilo que o trabalho não prova.',
    aboutTitle: 'Construindo evidências que viram ação',
    aboutBody: [
      'Atuo na interseção entre analytics engineering, decision science e estratégia de negócio. Hoje apoio um cliente global de seguros na Capgemini, trabalhando em inglês com times de produto e negócio dos Estados Unidos. Antes disso, construí produtos de dados e análises executivas para o marketplace BEES da AB InBev na América Latina.',
      'Minha forma de trabalhar é deliberadamente explícita: definir a decisão, quantificar o custo de errar, verificar o grão dos dados e reconciliar a métrica antes de otimizar um modelo ou dashboard. Essa disciplina orienta projetos de receita recorrente, eventos, política de crédito, segmentação e experimentação.',
      'Tenho pós-graduação em Estatística Aplicada e formação em Análise e Desenvolvimento de Sistemas. Gosto de traduzir restrições técnicas em decisões que negócio e engenharia consigam inspecionar juntos.',
    ],
    principlesTitle: 'Princípios de trabalho',
    principles: [
      'Começar pela decisão e pelo custo do erro.',
      'Validar grão, métrica e reconciliação antes de otimizar.',
      'Separar evidência observada, cenários sintéticos e alegações causais.',
      'Documentar limitações perto do resultado que elas qualificam.',
    ],
    timelineTitle: 'Experiência',
    educationTitle: 'Formação',
    languagesTitle: 'Idiomas',
    languages: 'Português — nativo · Inglês — fluente · Espanhol — intermediário',
    resumeTitle: 'Currículo',
    resumeBody: 'Um resumo da minha experiência em decision science, analytics engineering e business intelligence. A versão pública omite telefone e informações confidenciais do cliente.',
    resumeDownload: 'Baixar currículo em PDF',
    updated: 'Atualizado em setembro de 2026',
  },
  es: {
    nav: { home: 'Inicio', work: 'Proyectos', about: 'Sobre mí', resume: 'Currículum' },
    skip: 'Saltar al contenido',
    hero: {
      role: 'Decision Scientist y Analytics Engineer',
      statement: 'Construyo sistemas de datos confiables que las personas realmente utilizan.',
      detail: 'Desde la definición de métricas y los pipelines hasta experimentos, modelos de riesgo y decisiones de negocio.',
      workCta: 'Ver proyectos',
      resumeCta: 'Descargar currículum',
    },
    sections: {
      selected: 'Proyectos seleccionados',
      selectedIntro: 'Tres proyectos organizados alrededor de la decisión y de la evidencia necesaria para tomarla responsablemente.',
      scope: 'Cómo trabajo a lo largo de la decisión',
      other: 'Casos aplicados',
      about: 'Sobre mí',
      viewCase: 'Leer caso',
      repository: 'Repositorio',
      liveDemo: 'Demo en vivo',
      allWork: 'Ver todos los proyectos',
    },
    scope: [
      { title: 'Datos confiables', body: 'Contratos de métricas, transformaciones probadas, reconciliación y CI.' },
      { title: 'Modelos de decisión', body: 'Probabilidad, calibración, valor esperado y umbrales explícitos.' },
      { title: 'Acción de negocio', body: 'Política, experimentación, monitoreo y un costo de error claro.' },
    ],
    aboutShort: 'Soy Associate Decision Scientist en Capgemini y trabajo con un cliente global de seguros y equipos internacionales. Mi trayectoria combina analytics engineering, decision science y estadística aplicada. Comienzo por la decisión y el costo del error; después hago explícitos el grano, la métrica y la evidencia antes de optimizar la solución.',
    workIntro: 'Una selección enfocada de proyectos de decision science, analytics engineering y data engineering. Cada caso documenta la pregunta, los trade-offs, la evidencia, una corrección o camino descartado y aquello que el trabajo no demuestra.',
    aboutTitle: 'Construir evidencia que se convierte en acción',
    aboutBody: [
      'Trabajo en la intersección de analytics engineering, decision science y estrategia de negocio. Hoy apoyo a un cliente global de seguros en Capgemini, colaborando en inglés con equipos de producto y negocio de Estados Unidos. Antes construí productos de datos y análisis ejecutivos para el marketplace BEES de AB InBev en América Latina.',
      'Mi forma de trabajar es deliberadamente explícita: definir la decisión, cuantificar el costo de equivocarse, verificar el grano de los datos y reconciliar la métrica antes de optimizar un modelo o dashboard. Esa disciplina guía proyectos de ingresos recurrentes, eventos, política de crédito, segmentación y experimentación.',
      'Tengo una especialización en Estadística Aplicada y formación en Análisis y Desarrollo de Sistemas. Me interesa traducir restricciones técnicas en decisiones que negocio e ingeniería puedan inspeccionar juntos.',
    ],
    principlesTitle: 'Principios de trabajo',
    principles: [
      'Comenzar por la decisión y el costo del error.',
      'Validar grano, métrica y reconciliación antes de optimizar.',
      'Separar evidencia observada, escenarios sintéticos y afirmaciones causales.',
      'Documentar las limitaciones junto al resultado que califican.',
    ],
    timelineTitle: 'Experiencia',
    educationTitle: 'Formación',
    languagesTitle: 'Idiomas',
    languages: 'Portugués — nativo · Inglés — fluido · Español — intermedio',
    resumeTitle: 'Currículum',
    resumeBody: 'Un resumen de mi experiencia en decision science, analytics engineering y business intelligence. La versión pública omite teléfono e información confidencial del cliente.',
    resumeDownload: 'Descargar currículum en PDF',
    updated: 'Actualizado en septiembre de 2026',
  },
};

export const selectedProjects: Record<Locale, Array<{
  slug: CaseSlug;
  number: string;
  role: string;
  title: string;
  question: string;
  evidence: string[];
}>> = {
  en: [
    { slug: 'thin-file-credit-decision-engine', number: '01', role: 'Decision Science', title: 'Thin-File Credit Decision Engine', question: 'Who should be approved, at what first-loan size, and when is extra verification worth the friction?', evidence: ['Out-of-time validation', 'Calibrated risk and take-up', 'Expected-value policy'] },
    { slug: 'subscription-analytics-dbt', number: '02', role: 'Analytics Engineering', title: 'Subscription Analytics with dbt', question: 'Can Finance and Product trust MRR, NRR, churn and retention as data changes?', evidence: ['Reconciled MRR bridge', 'Fixed cohort denominator', '76 passing dbt nodes'] },
    { slug: 'marketplace-event-lakehouse', number: '03', role: 'Data Engineering', title: 'Marketplace Event Lakehouse', question: 'How do duplicated, late and out-of-order events become trustworthy funnel and revenue metrics?', evidence: ['Replay-safe processing', 'Sequence-aware funnels', 'Measured 100k-event benchmark'] },
  ],
  'pt-br': [
    { slug: 'thin-file-credit-decision-engine', number: '01', role: 'Decision Science', title: 'Thin-File Credit Decision Engine', question: 'Quem aprovar, qual primeiro limite oferecer e quando uma verificação extra compensa o atrito?', evidence: ['Validação out-of-time', 'Risco e adesão calibrados', 'Política por valor esperado'] },
    { slug: 'subscription-analytics-dbt', number: '02', role: 'Analytics Engineering', title: 'Subscription Analytics with dbt', question: 'Finance e Produto podem confiar em MRR, NRR, churn e retenção quando os dados mudam?', evidence: ['MRR bridge reconciliado', 'Denominador de cohort corrigido', '76 nós dbt aprovados'] },
    { slug: 'marketplace-event-lakehouse', number: '03', role: 'Data Engineering', title: 'Marketplace Event Lakehouse', question: 'Como eventos duplicados, atrasados e fora de ordem viram métricas confiáveis de funil e receita?', evidence: ['Processamento replay-safe', 'Funil sensível à sequência', 'Benchmark de 100 mil eventos'] },
  ],
  es: [
    { slug: 'thin-file-credit-decision-engine', number: '01', role: 'Decision Science', title: 'Thin-File Credit Decision Engine', question: '¿A quién aprobar, qué primer límite ofrecer y cuándo una verificación adicional compensa la fricción?', evidence: ['Validación out-of-time', 'Riesgo y aceptación calibrados', 'Política por valor esperado'] },
    { slug: 'subscription-analytics-dbt', number: '02', role: 'Analytics Engineering', title: 'Subscription Analytics with dbt', question: '¿Finanzas y Producto pueden confiar en MRR, NRR, churn y retención cuando cambian los datos?', evidence: ['Puente de MRR reconciliado', 'Denominador de cohorte corregido', '76 nodos dbt aprobados'] },
    { slug: 'marketplace-event-lakehouse', number: '03', role: 'Data Engineering', title: 'Marketplace Event Lakehouse', question: '¿Cómo convertir eventos duplicados, tardíos y desordenados en métricas confiables de embudo e ingresos?', evidence: ['Procesamiento replay-safe', 'Embudos sensibles a secuencia', 'Benchmark de 100 mil eventos'] },
  ],
};

export const otherProjects: Record<Locale, Array<{ slug: CaseSlug; title: string; body: string; evidence: string }>> = {
  en: [
    { title: 'Starbucks Promo Effectiveness', body: 'Attributed repeated offers with explicit exposure windows and separated observational evidence from causal claims.', evidence: 'Temporal attribution · ROI framing', slug: 'starbucks-promo-effectiveness-analysis' },
    { title: 'Retailer RFM Decisioning', body: 'Turned behavioral segments into cost-aware campaign actions and an explicit do-not-target policy.', evidence: '5,878 customers · 68.2% revenue in Champions', slug: 'retailer-segmentation-rfm-clustering' },
    { title: 'Hevy Workout ETL', body: 'Protected historical workout snapshots from partial API responses and exposed trusted Gold outputs in a live dashboard.', evidence: '56 tests · Live data product', slug: 'hevy-workout-etl-pipeline' },
  ],
  'pt-br': [
    { title: 'Starbucks Promo Effectiveness', body: 'Atribuí ofertas repetidas com janelas de exposição explícitas e separei evidência observacional de alegações causais.', evidence: 'Atribuição temporal · ROI', slug: 'starbucks-promo-effectiveness-analysis' },
    { title: 'Retailer RFM Decisioning', body: 'Transformei segmentos comportamentais em ações de campanha sensíveis a custo e numa política explícita de não segmentação.', evidence: '5.878 clientes · 68,2% da receita em Champions', slug: 'retailer-segmentation-rfm-clustering' },
    { title: 'Hevy Workout ETL', body: 'Protegi snapshots históricos contra respostas parciais da API e expus outputs Gold confiáveis num dashboard ao vivo.', evidence: '56 testes · Produto de dados ao vivo', slug: 'hevy-workout-etl-pipeline' },
  ],
  es: [
    { title: 'Starbucks Promo Effectiveness', body: 'Atribuí ofertas repetidas con ventanas de exposición explícitas y separé evidencia observacional de afirmaciones causales.', evidence: 'Atribución temporal · ROI', slug: 'starbucks-promo-effectiveness-analysis' },
    { title: 'Retailer RFM Decisioning', body: 'Convertí segmentos de comportamiento en acciones de campaña sensibles al costo y una política explícita de no targeting.', evidence: '5.878 clientes · 68,2% de ingresos en Champions', slug: 'retailer-segmentation-rfm-clustering' },
    { title: 'Hevy Workout ETL', body: 'Protegí snapshots históricos de respuestas parciales de la API y expuse outputs Gold confiables en un dashboard en vivo.', evidence: '56 pruebas · Producto de datos en vivo', slug: 'hevy-workout-etl-pipeline' },
  ],
};
