# E-Reserv Frontend (Angular 17)

Aplicação SPA para reservas de mesa e gestão de restaurante, construída com Angular 17, componentes standalone, Angular Material e Signals. Este README documenta decisões, arquitetura, fluxos, execução local e próximos passos.

## Visão Geral

- Público: descoberta de unidades, detalhes da unidade e fluxo de reserva em 2 etapas (dados da reserva + dados do cliente).
- Administração: login, shell com navegação lateral, dashboard com calendário/indicadores, lista de reservas (placeholder) e fila de espera.
- Componentes standalone, rotas lazy (`loadComponent`), Angular Material 17, Signals para estado reativo e `HttpClient` para dados mock.

## Por que Angular

- Escala e padronização: CLI, roteamento, DI, formulários reativos, `HttpClient` e Material aceleram entregas com consistência.
- Standalone + lazy routes: inicialização rápida, bundles por rota e manutenção mais simples.
- Signals: estado reativo nativo, performático e leve para casos de uso locais.
- Formulários reativos: validações robustas e integração com Material.
- Design System: Material oferece acessibilidade e responsividade, com theming central em `src/styles.scss`.
- Segurança: base para guards, interceptors e CSP em `src/index.html`.

## Arquitetura

- Bootstrap: `src/main.ts`
  - `bootstrapApplication(AppComponent)` com `provideRouter(routes)`, `provideAnimations()` e `provideHttpClient()` (com interceptor simples que adiciona `X-Requested-With`).
- Rotas: `src/app/app.routes.ts`
  - Público: `''` (Home), `unidade/:id` (Unit), `unidade/:id/reserva` (Step), `unidade/:id/reserva/confirmar` (Confirm).
  - Admin: `/gestao/login`, `/gestao` (shell) com filhos: `''` (Dashboard), `reservas`, `fila`.
  - Todos os componentes são carregados via `loadComponent` (lazy-loading).
- Shells:
  - Público: `AppComponent` com toolbar e `router-outlet`.
  - Admin: `AdminShellComponent` com topbar, `mat-sidenav` e `router-outlet` interno.
- Core:
  - Modelos: `Unit`, `ReservationDetails`, `CustomerInfo`, `ReservationPayload`.
  - Serviço: `ReservationService` com Signals e persistência em `sessionStorage`.
- UI/Theme: Angular Material 17 com tema em `src/styles.scss` e ajustes de overlay/scroll.

### Estrutura de Pastas (resumo)

- `src/main.ts` – Bootstrap e providers (router, http, animations)
- `src/app/app.routes.ts` – Definição de rotas lazy
- `src/app/app.component.*` – Shell público
- `src/app/core/models/*` – Tipagens de domínio
- `src/app/core/services/reservation.service.ts` – Estado da reserva
- `src/app/features/home/*` – Descoberta e busca de unidades
- `src/app/features/unit/*` – Detalhe da unidade
- `src/app/features/reserva/*` – Passo e confirmação de reserva
- `src/app/admin/*` – Login, shell, dashboard, reservas e fila
- `src/assets/mock/units.json` – Dados mock de unidades
- `src/styles.scss` – Theming e resets de layout

## Fluxos Principais

### Público

1. Home (`/`)
   - Carrega unidades de `assets/mock/units.json` e filtra por nome/cidade.
   - Navega para `unidade/:id` ao selecionar uma unidade.
2. Unidade (`/unidade/:id`)
   - Apresenta dados da unidade e ação “Fazer reserva”.
   - Navega para `unidade/:id/reserva`.
3. Reserva – Detalhes (`/unidade/:id/reserva`)
   - Form com `date`, `time`, `people`, `area`, `notes`.
   - Normaliza a data para `yyyy-mm-dd` e persiste no `ReservationService`.
   - Navega para `unidade/:id/reserva/confirmar`.
4. Reserva – Confirmação (`/unidade/:id/reserva/confirmar`)
   - Captura `details` do serviço e pede `name`, `phone`, `email`.
   - Monta `ReservationPayload` e (mock) confirma, limpando estado e redirecionando ao Home.

### Administração

- Login (`/gestao/login`): formulário simples que navega para `/gestao` (sem auth real ainda).
- Shell (`/gestao`): topbar + `sidenav` com links.
- Dashboard: indicadores estáticos e calendário mensal gerado dinamicamente com `Signals` + `computed`.
- Reservas: filtros/table placeholders e abertura de dialog “Nova reserva”.
- Fila de espera: lista interativa (dados simulados) com ações por item.

## Estado e Dados

- `ReservationService` usa `signal` para `details` e `customer`, com `computed` para leitura reativa.
- Persistência volátil via `sessionStorage` (`reservation.details` e `reservation.customer`).
- Método `buildPayload()` consolida os dados para envio.
- Dados mock (unidades) em `assets/mock/units.json` via `HttpClient`.

## HTTP e Interceptores

- Interceptor básico adiciona `X-Requested-With` a todas as requisições.
- Próximos passos: interceptors de Auth (Bearer/JWT), tratativa global de erros e `retry/backoff` quando necessário.

## Estilo e UX

- Theming do Angular Material centralizado em `src/styles.scss`.
- Correções de overlay/scroll para `mat-sidenav` e CDK Overlay evitando “scroll duplo”.
- Fontes e ícones via Google Fonts/Icon (liberados na CSP para dev).

## Pontos Técnicos Notáveis

- Standalone + Lazy-loading: componentes carregados por rota simplificam boundaries e reduzem bundle inicial.
- Signals: substituem observables simples para estado local/per-page com baixo overhead.
- Formulários reativos: validações declarativas e integração de UX com Material.
- Calendário (Dashboard): cálculo de deslocamento semanal e preenchimento de grade 6×7 (42 células) com flags de indisponibilidade.
- Persistência do fluxo: `sessionStorage` permite retomar confirmação após refresh.

## Como Rodar

Pré-requisitos: Node 18+, npm, Angular CLI 17.

```bash
cd e-reserv-frontend
npm install
npm start
# abre em http://localhost:4200/
```

Build de produção:

```bash
npm run build
# artefatos em dist/e-reserv-frontend
```

## Scripts

- `npm start` – Servidor de desenvolvimento com HMR.
- `npm run build` – Build de produção (otimizações ligadas).
- `npm run watch` – Build contínuo em modo desenvolvimento.
- `npm test` – Placeholder (sem testes configurados).

## Próximos Passos (Sugeridos)

- Autenticação real: guards no `/gestao`, interceptor de Authorization, refresh token, logout.
- API real: serviços para reservas/unidades/fila com DTOs e tratamento de erros.
- Observabilidade: snackbars para feedback, logging e monitoramento (ex.: Sentry).
- Acessibilidade: foco gerenciado em dialogs, labels e aria-atributos completos.
- I18n e máscaras: pipes/validações para telefone e suporte multilíngue.

## Licença

Projeto privado/educacional. Adapte a licença conforme necessário.

