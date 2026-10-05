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
  methodIntro: string;
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
      role: 'Decision Scientist & Analytics Engineer',
      statement: 'I build data systems that people trust — and that actually get used.',
      detail: 'From metric definitions and reliable pipelines to experiments, risk models and business decisions.',
      workCta: 'View selected work',
      resumeCta: 'Download résumé',
    },
    sections: {
      selected: 'Selected work',
      selectedIntro: 'Credit decisions, subscription economics and marketplace events — three working systems with inspectable data, logic and results.',
      scope: 'From raw data to a usable decision',
      other: 'Applied case studies',
      about: 'About',
      viewCase: 'Read case study',
      repository: 'Repository',
      liveDemo: 'Live demo',
      allWork: 'View all work',
    },
    scope: [
      { title: 'Define the contract', body: 'Set each metric’s level of detail, timing and owner before building the final result.' },
      { title: 'Test the reasoning', body: 'Reconcile balances, validate probabilities and encode business invariants as automated tests.' },
      { title: 'Deliver the decision', body: 'Expose the result through an auditable policy, dashboard or analytical model people can use.' },
    ],
    methodIntro: 'I connect three layers that often drift apart: the data contract, the analytical method and the operational decision. The work below makes each layer inspectable through tested metrics, explicit policy logic and usable interfaces.',
    aboutShort: 'I am an Associate Decision Scientist at Capgemini, working with a global insurance client and international teams. My background combines analytics engineering, decision science and applied statistics. I start by defining the decision and the cost of getting it wrong, then clarify the data, metric and evidence before optimizing the solution.',
    workIntro: 'Six complete projects covering credit policy, subscription revenue, event processing, promotion analysis, customer segmentation and personal-data ETL. Each case shows the product, its architecture, the decisions encoded and the evidence produced.',
    aboutTitle: 'Building evidence people can act on',
    aboutBody: [
      'I work at the intersection of analytics engineering, decision science and business strategy. Today I support a global insurance client at Capgemini, partnering with US-based product and business teams in English. Previously, I built data products and executive analytics for AB InBev’s BEES marketplace across Latin America.',
      'My preferred working style is deliberately explicit: define the decision, quantify the cost of being wrong, verify the data at the right level of detail, and reconcile the metric before optimizing a model or dashboard. That discipline has shaped projects ranging from subscription revenue and event pipelines to credit policy, segmentation and experimentation.',
      'I hold a specialization in Applied Statistics and a degree in Systems Analysis and Development. I enjoy translating technical constraints into decisions that business and engineering teams can inspect together.',
    ],
    principlesTitle: 'Working principles',
    principles: [
      'Start with the decision and the cost of error.',
      'Validate the level of detail, metric definition and reconciliation before optimization.',
      'Separate observed evidence, synthetic scenarios and causal claims.',
      'Keep assumptions and evidence boundaries next to the metric they qualify.',
    ],
    timelineTitle: 'Experience',
    educationTitle: 'Education',
    languagesTitle: 'Languages',
    languages: 'Portuguese — native · English — fluent · Spanish — intermediate',
    resumeTitle: 'Résumé',
    resumeBody: 'Experience building decision systems, analytical models and reliable data products across insurance, marketplace analytics and business intelligence.',
    resumeDownload: 'Download PDF résumé',
    updated: 'Updated October 2026',
  },
  'pt-br': {
    nav: { home: 'Início', work: 'Projetos', about: 'Sobre', resume: 'Currículo' },
    skip: 'Pular para o conteúdo',
    hero: {
      role: 'Decision Scientist & Analytics Engineer',
      statement: 'Construo sistemas de dados confiáveis que realmente apoiam decisões.',
      detail: 'Da definição de métricas e dos pipelines a experimentos, modelos de risco e decisões de negócio.',
      workCta: 'Ver projetos',
      resumeCta: 'Baixar currículo',
    },
    sections: {
      selected: 'Projetos selecionados',
      selectedIntro: 'Decisões de crédito, economia de assinaturas e eventos de marketplace — três sistemas funcionais com dados, lógica e resultados verificáveis.',
      scope: 'Do dado bruto à decisão utilizável',
      other: 'Estudos de caso aplicados',
      about: 'Sobre',
      viewCase: 'Ver estudo de caso',
      repository: 'Repositório',
      liveDemo: 'Demo ao vivo',
      allWork: 'Ver todos os projetos',
    },
    scope: [
      { title: 'Definir o contrato', body: 'Estabelecer o nível de detalhe, o período e a responsabilidade de cada métrica antes de produzir o resultado.' },
      { title: 'Testar o raciocínio', body: 'Reconciliar saldos, validar probabilidades e transformar invariantes de negócio em testes automatizados.' },
      { title: 'Entregar a decisão', body: 'Apresentar o resultado em uma política, painel ou modelo analítico que possa ser auditado e usado.' },
    ],
    methodIntro: 'Conecto três camadas que muitas vezes se afastam: o contrato dos dados, o método analítico e a decisão operacional. Os projetos abaixo mostram cada camada com métricas testadas, regras explícitas e interfaces prontas para uso.',
    aboutShort: 'Sou Associate Decision Scientist na Capgemini e trabalho com um cliente global de seguros e equipes internacionais. Minha experiência reúne engenharia analítica, ciência de decisão e estatística aplicada. Começo definindo a decisão e o custo de errar; depois esclareço os dados, a métrica e a evidência antes de otimizar a solução.',
    workIntro: 'Seis projetos completos sobre crédito, receita recorrente, processamento de eventos, promoções, segmentação de clientes e ETL de dados pessoais. Cada estudo de caso apresenta o produto, a arquitetura, as decisões implementadas e as evidências geradas.',
    aboutTitle: 'Transformando evidências em decisões',
    aboutBody: [
      'Atuo na interseção entre analytics engineering, decision science e estratégia de negócio. Hoje apoio um cliente global de seguros na Capgemini, trabalhando em inglês com times de produto e negócio dos Estados Unidos. Antes disso, construí produtos de dados e análises executivas para o marketplace BEES da AB InBev na América Latina.',
      'Minha forma de trabalhar é direta: definir a decisão, quantificar o custo de errar, conferir o nível de detalhe dos dados e reconciliar a métrica antes de otimizar um modelo ou painel. Essa disciplina orienta projetos de receita recorrente, eventos, política de crédito, segmentação e experimentação.',
      'Tenho pós-graduação em Estatística Aplicada e formação em Análise e Desenvolvimento de Sistemas. Gosto de traduzir restrições técnicas em decisões que negócio e engenharia consigam inspecionar juntos.',
    ],
    principlesTitle: 'Princípios de trabalho',
    principles: [
      'Começar pela decisão e pelo custo do erro.',
      'Validar o nível de detalhe, a definição da métrica e a reconciliação antes de otimizar.',
      'Separar evidência observada, cenários sintéticos e alegações causais.',
      'Manter premissas e alcance da evidência junto da métrica que elas qualificam.',
    ],
    timelineTitle: 'Experiência',
    educationTitle: 'Formação',
    languagesTitle: 'Idiomas',
    languages: 'Português — nativo · Inglês — fluente · Espanhol — intermediário',
    resumeTitle: 'Currículo',
    resumeBody: 'Experiência construindo sistemas de decisão, modelos analíticos e produtos de dados confiáveis em seguros, marketplace e business intelligence.',
    resumeDownload: 'Baixar currículo em PDF',
    updated: 'Atualizado em outubro de 2026',
  },
  es: {
    nav: { home: 'Inicio', work: 'Proyectos', about: 'Sobre mí', resume: 'Currículum' },
    skip: 'Saltar al contenido',
    hero: {
      role: 'Decision Scientist & Analytics Engineer',
      statement: 'Construyo sistemas de datos confiables que realmente ayudan a tomar decisiones.',
      detail: 'Desde la definición de métricas y los pipelines hasta los experimentos, los modelos de riesgo y las decisiones de negocio.',
      workCta: 'Ver proyectos',
      resumeCta: 'Descargar currículum',
    },
    sections: {
      selected: 'Proyectos seleccionados',
      selectedIntro: 'Decisiones de crédito, economía de suscripciones y eventos de marketplace: tres sistemas funcionales con datos, lógica y resultados verificables.',
      scope: 'Del dato bruto a una decisión utilizable',
      other: 'Casos aplicados',
      about: 'Sobre mí',
      viewCase: 'Leer caso',
      repository: 'Repositorio',
      liveDemo: 'Demo en vivo',
      allWork: 'Ver todos los proyectos',
    },
    scope: [
      { title: 'Definir el contrato', body: 'Establecer el nivel de detalle, el período y la responsabilidad de cada métrica antes de producir el resultado.' },
      { title: 'Probar el razonamiento', body: 'Reconciliar saldos, validar probabilidades y convertir invariantes de negocio en pruebas automatizadas.' },
      { title: 'Entregar la decisión', body: 'Presentar el resultado mediante una política, un panel o un modelo analítico que pueda auditarse y utilizarse.' },
    ],
    methodIntro: 'Conecto tres capas que suelen separarse: el contrato de datos, el método analítico y la decisión operativa. Los proyectos muestran cada capa con métricas probadas, reglas explícitas e interfaces listas para usar.',
    aboutShort: 'Trabajo como Associate Decision Scientist en Capgemini con un cliente global de seguros y equipos internacionales. Mi experiencia combina ingeniería analítica, ciencia de decisiones y estadística aplicada. Comienzo definiendo la decisión y el costo de equivocarse; después aclaro los datos, la métrica y la evidencia antes de optimizar la solución.',
    workIntro: 'Seis proyectos completos sobre crédito, ingresos recurrentes, procesamiento de eventos, promociones, segmentación de clientes y ETL de datos personales. Cada caso presenta el producto, la arquitectura, las decisiones implementadas y la evidencia generada.',
    aboutTitle: 'Convertir evidencia en decisiones',
    aboutBody: [
      'Trabajo en la intersección de analytics engineering, decision science y estrategia de negocio. Hoy apoyo a un cliente global de seguros en Capgemini, colaborando en inglés con equipos de producto y negocio de Estados Unidos. Antes construí productos de datos y análisis ejecutivos para el marketplace BEES de AB InBev en América Latina.',
      'Mi forma de trabajar es directa: definir la decisión, cuantificar el costo de equivocarse, comprobar el nivel de detalle de los datos y reconciliar la métrica antes de optimizar un modelo o panel. Esa disciplina guía proyectos de ingresos recurrentes, eventos, política de crédito, segmentación y experimentación.',
      'Tengo una especialización en Estadística Aplicada y formación en Análisis y Desarrollo de Sistemas. Me interesa traducir restricciones técnicas en decisiones que negocio e ingeniería puedan inspeccionar juntos.',
    ],
    principlesTitle: 'Principios de trabajo',
    principles: [
      'Comenzar por la decisión y el costo del error.',
      'Validar el nivel de detalle, la definición de la métrica y la conciliación antes de optimizar.',
      'Separar evidencia observada, escenarios sintéticos y afirmaciones causales.',
      'Mantener los supuestos y el alcance de la evidencia junto a la métrica que califican.',
    ],
    timelineTitle: 'Experiencia',
    educationTitle: 'Formación',
    languagesTitle: 'Idiomas',
    languages: 'Portugués — nativo · Inglés — fluido · Español — intermedio',
    resumeTitle: 'Currículum',
    resumeBody: 'Experiencia construyendo sistemas de decisión, modelos analíticos y productos de datos confiables en seguros, marketplaces y business intelligence.',
    resumeDownload: 'Descargar currículum en PDF',
    updated: 'Actualizado en octubre de 2026',
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
    { slug: 'thin-file-credit-decision-engine', number: '01', role: 'Ciência de Decisão', title: 'Motor de Decisão de Crédito para Pouco Histórico', question: 'Quem aprovar, qual primeiro limite oferecer e quando uma verificação extra compensa o atrito?', evidence: ['Validação temporal', 'Risco e adesão calibrados', 'Política baseada em valor esperado'] },
    { slug: 'subscription-analytics-dbt', number: '02', role: 'Engenharia Analítica', title: 'Análise de Assinaturas com dbt', question: 'Finanças e Produto podem confiar em MRR, NRR, churn e retenção quando os dados mudam?', evidence: ['Ponte de MRR reconciliada', 'Denominador fixo por coorte', '76 nós dbt aprovados'] },
    { slug: 'marketplace-event-lakehouse', number: '03', role: 'Engenharia de Dados', title: 'Lakehouse de Eventos do Marketplace', question: 'Como eventos duplicados, atrasados e fora de ordem viram métricas confiáveis de funil e receita?', evidence: ['Reprocessamento seguro', 'Funil que respeita a sequência', 'Benchmark com 100 mil eventos'] },
  ],
  es: [
    { slug: 'thin-file-credit-decision-engine', number: '01', role: 'Ciencia de Decisiones', title: 'Motor de Decisión Crediticia para Poco Historial', question: '¿A quién aprobar, qué primer límite ofrecer y cuándo una verificación adicional compensa la fricción?', evidence: ['Validación temporal', 'Riesgo y aceptación calibrados', 'Política basada en valor esperado'] },
    { slug: 'subscription-analytics-dbt', number: '02', role: 'Ingeniería Analítica', title: 'Analítica de Suscripciones con dbt', question: '¿Finanzas y Producto pueden confiar en MRR, NRR, churn y retención cuando cambian los datos?', evidence: ['Puente de MRR reconciliado', 'Denominador fijo por cohorte', '76 nodos dbt aprobados'] },
    { slug: 'marketplace-event-lakehouse', number: '03', role: 'Ingeniería de Datos', title: 'Lakehouse de Eventos del Marketplace', question: '¿Cómo convertir eventos duplicados, tardíos y desordenados en métricas confiables de embudo e ingresos?', evidence: ['Reprocesamiento seguro', 'Embudo que respeta la secuencia', 'Benchmark con 100 mil eventos'] },
  ],
};

export const otherProjects: Record<Locale, Array<{ slug: CaseSlug; title: string; body: string; evidence: string }>> = {
  en: [
    { title: 'Starbucks Promo Effectiveness', body: 'Analyzes 115,609 offer exposures to compare discount, BOGO and informational campaigns, then defines the controlled experiment needed to measure incremental margin.', evidence: 'Temporal attribution · ROI framing', slug: 'starbucks-promo-effectiveness-analysis' },
    { title: 'Retailer RFM Decisioning', body: 'Segments 5,878 customers by recency, purchase frequency and spend, then assigns campaign actions according to expected net value.', evidence: '5,878 customers · 68.2% revenue in Champions', slug: 'retailer-segmentation-rfm-clustering' },
    { title: 'Hevy Workout ETL', body: 'Extracts complete workout history from the Hevy API, models it through Bronze, Silver and Gold layers, and serves an interactive progression dashboard.', evidence: '56 tests · Live data product', slug: 'hevy-workout-etl-pipeline' },
  ],
  'pt-br': [
    { title: 'Efetividade das Promoções Starbucks', body: 'Analisa 115.609 exposições para comparar campanhas de desconto, BOGO e informativas e definir o experimento necessário para medir margem incremental.', evidence: 'Atribuição temporal · Análise de retorno', slug: 'starbucks-promo-effectiveness-analysis' },
    { title: 'Decisões de Campanha com RFM', body: 'Segmenta 5.878 clientes por recência, frequência e valor gasto e recomenda ações de campanha de acordo com o retorno líquido esperado.', evidence: '5.878 clientes · 68,2% da receita em Champions', slug: 'retailer-segmentation-rfm-clustering' },
    { title: 'ETL de Treinos do Hevy', body: 'Extrai o histórico completo da API do Hevy, organiza os dados nas camadas Bronze, Silver e Gold e alimenta um painel interativo de evolução dos treinos.', evidence: '56 testes · Produto de dados ao vivo', slug: 'hevy-workout-etl-pipeline' },
  ],
  es: [
    { title: 'Efectividad de las Promociones de Starbucks', body: 'Analiza 115.609 exposiciones para comparar campañas de descuento, BOGO e informativas y definir el experimento necesario para medir el margen incremental.', evidence: 'Atribución temporal · Análisis de retorno', slug: 'starbucks-promo-effectiveness-analysis' },
    { title: 'Decisiones de Campaña con RFM', body: 'Segmenta 5.878 clientes por recencia, frecuencia y gasto, y recomienda acciones de campaña según el valor neto esperado.', evidence: '5.878 clientes · 68,2% de ingresos en Champions', slug: 'retailer-segmentation-rfm-clustering' },
    { title: 'ETL de Entrenamientos de Hevy', body: 'Extrae el historial completo de la API de Hevy, organiza los datos en capas Bronze, Silver y Gold y alimenta un panel interactivo de evolución del entrenamiento.', evidence: '56 pruebas · Producto de datos en vivo', slug: 'hevy-workout-etl-pipeline' },
  ],
};
