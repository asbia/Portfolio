// projects for the work section. screenshots: assets/projects/<id>.jpg|png|webp
const C = { paper: '#EFE9E4', ink: '#18201D', blue: '#1F4FCB', orange: '#F2480E', cream: '#F7F2EE' };

window.PROJECTS = [
  /* TODO(netbadge): uncomment once it's public
  {
    id: 'netbadge',
    title: 'NetBadge',
    kicker: 'Startup · Co-founder',
    meta: [['Role', 'Co-founder'], ['Year', '2026 –'], ['Team', '5 people'], ['Status', 'Pre-MVP']],
    desc: 'A conversation-recording lanyard badge and React Native app that turns a multilingual founder event into a ranked follow-up list. Each pick comes with a reason, a supporting quote and a draft message.',
    points: [
      'Built the switch-aware speech recognition pipeline for Darija, French, English and MSA code-switching.',
      'Leading speech-to-text evaluation and agent ranking work.',
      'Consent-first design: a green LED, a spoken recording notice and automatic audio deletion. Live pilot planned with 10 founders.'
    ],
    tags: ['React Native', 'Python', 'Speech AI', 'Startup'],
    links: [],
    bg: C.blue,
    art: `<svg viewBox="0 0 600 450" aria-hidden="true">
      <path d="M230 0 L270 150 M370 0 L330 150" stroke="${C.ink}" stroke-width="8"/>
      <rect x="215" y="140" width="170" height="230" rx="18" fill="${C.cream}"/>
      <rect x="275" y="152" width="50" height="10" rx="5" fill="${C.ink}"/>
      <circle cx="300" cy="225" r="34" fill="${C.ink}"/>
      <circle cx="300" cy="225" r="9" fill="#2BBF6A" class="blink"/>
      <rect x="250" y="285" width="100" height="10" rx="5" fill="${C.ink}" opacity=".85"/>
      <rect x="265" y="305" width="70" height="8" rx="4" fill="${C.ink}" opacity=".35"/>
      <path d="M410 215 q16 10 0 20 M432 200 q30 25 0 50 M454 185 q44 40 0 80" fill="none" stroke="${C.cream}" stroke-width="6" stroke-linecap="round"/>
      <g font-family="Playfair Display, Georgia, serif" font-size="22" fill="${C.cream}">
        <rect x="38" y="120" width="140" height="52" rx="26" fill="${C.orange}"/><text x="108" y="153" text-anchor="middle">Salam!</text>
        <rect x="58" y="210" width="130" height="52" rx="26" fill="${C.ink}"/><text x="123" y="243" text-anchor="middle">Bonjour</text>
        <rect x="28" y="300" width="150" height="52" rx="26" fill="${C.orange}"/><text x="103" y="333" text-anchor="middle">Nice to meet</text>
      </g>
    </svg>`
  },
  */
  {
    id: 'languageswitch',
    title: 'LanguageSwitch',
    kicker: 'Research · Code-switched speech benchmark',
    meta: [['Data', '2,000 utterances'], ['Audio', '4 hours'], ['Speakers', '24'], ['Models', '5 ASR']],
    desc: 'An open test set of Darija mixed with French and English, with transcription guidelines, for measuring how speech recognition handles language switches.',
    points: [
      'Evaluated 5 ASR models: word error rate was 58% at language-switch points vs 41% elsewhere.',
      // TODO(netbadge): switch back to this one
      // 'Built a switch-aware pipeline (used in NetBadge) that cut WER on the benchmark from 47% to 38%.',
      'Built a switch-aware pipeline that cut WER on the benchmark from 47% to 38%.',
      'Python, Hugging Face, Whisper, MMS/wav2vec2 and jiwer.'
    ],
    tags: ['Python', 'Hugging Face', 'Whisper', 'Data'],
    links: [],
    bg: C.orange,
    art: `<svg viewBox="0 0 600 450" aria-hidden="true" font-family="DM Sans, system-ui, sans-serif">
      <text x="60" y="62" font-family="Playfair Display, Georgia, serif" font-size="24" fill="${C.cream}">Word error rate on the benchmark</text>
      <g stroke="${C.cream}" stroke-opacity=".35" stroke-width="1.5">
        <path d="M90 330 H540 M90 287 H540 M90 243 H540 M90 200 H540 M90 157 H540 M90 113 H540"/>
        <path d="M150 100 V330 M480 100 V330"/>
      </g>
      <g fill="${C.cream}" font-size="15" opacity=".8" text-anchor="end">
        <text x="76" y="335">30%</text><text x="76" y="248">40%</text><text x="76" y="162">50%</text>
      </g>
      <path class="draw" d="M150 182 C 260 182 360 261 480 261" fill="none" stroke="${C.cream}" stroke-width="4" stroke-linecap="round"/>
      <circle cx="150" cy="182" r="9" fill="${C.cream}"/>
      <circle cx="480" cy="261" r="12" fill="${C.orange}" stroke="${C.cream}" stroke-width="4"/>
      <text x="150" y="160" text-anchor="middle" font-family="Playfair Display, Georgia, serif" font-size="30" font-weight="700" fill="${C.cream}">47%</text>
      <text x="480" y="236" text-anchor="middle" font-family="Playfair Display, Georgia, serif" font-size="44" font-weight="700" fill="${C.cream}">38%</text>
      <g fill="${C.cream}" font-size="17" text-anchor="middle">
        <text x="150" y="365">Baseline</text><text x="480" y="365">Switch-aware</text>
      </g>
    </svg>`
  },
  {
    id: 'cle-platforms',
    title: 'Kudos, Behive & Xpress',
    kicker: 'neoCedrus · University platforms',
    meta: [['Role', 'Software developer'], ['Years', '2024 – 2026'], ['Users', '5,000+ on Kudos'], ['Stack', 'MERN + PostgreSQL']],
    desc: 'Three official platforms for Al Akhawayn’s Center for Learning Excellence: tutor and mentor booking (Kudos), part-time jobs (Behive), and feedback and claims (Xpress).',
    points: [
      'Refactored the legacy Kudos booking platform and shipped a new version with new features and bug fixes.',
      'Built v1 of Behive from scratch with the team.',
      'Maintained Xpress; Behive and Xpress each serve 1,000+ active users.'
    ],
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'PostgreSQL'],
    links: [
      { label: 'Kudos', href: 'https://kudos.aui.ma/' },
      { label: 'Behive', href: 'https://behive.aui.ma' },
      { label: 'neoCedrus', href: 'https://neocedrus.com/' }
    ],
    bg: C.ink,
    art: `<svg viewBox="0 0 600 450" aria-hidden="true" font-family="Playfair Display, Georgia, serif">
      <g transform="translate(70 60)"><rect width="300" height="200" rx="14" fill="${C.cream}"/><rect width="300" height="40" rx="14" fill="${C.blue}"/><rect y="26" width="300" height="14" fill="${C.blue}"/><text x="20" y="27" font-size="20" fill="${C.cream}">Xpress</text></g>
      <g transform="translate(150 120)"><rect width="300" height="200" rx="14" fill="${C.cream}"/><rect width="300" height="40" rx="14" fill="${C.ink}" stroke="${C.cream}" stroke-width="2"/><text x="20" y="27" font-size="20" fill="${C.cream}">Behive</text></g>
      <g transform="translate(230 180)"><rect width="300" height="200" rx="14" fill="${C.cream}"/><rect width="300" height="40" rx="14" fill="${C.orange}"/><rect y="26" width="300" height="14" fill="${C.orange}"/><text x="20" y="27" font-size="20" fill="${C.cream}">Kudos</text>
        <circle cx="50" cy="95" r="24" fill="${C.blue}"/><rect x="90" y="80" width="160" height="10" rx="5" fill="${C.ink}"/><rect x="90" y="100" width="110" height="8" rx="4" fill="${C.ink}" opacity=".35"/>
        <rect x="26" y="140" width="110" height="36" rx="18" fill="${C.blue}"/><text x="81" y="164" font-size="15" text-anchor="middle" fill="${C.cream}">Book a tutor</text></g>
    </svg>`
  },
  {
    id: 'banking-platform',
    title: 'Banking-branch platform',
    kicker: 'Global Performance Business Services · Internship',
    meta: [['Role', 'Software engineer intern'], ['Year', '2026'], ['Team', '~12 people'], ['Users', 'Major Moroccan banks']],
    desc: 'An integrated platform for bank branches covering core banking, CRM, sanctions screening, fraud and AML detection, analytics and onboarding.',
    points: [
      'Built features in Java/Spring Boot and React/TypeScript, with Keycloak access control.',
      'Turned the needs of bank agents and branch directors into technical work, and coordinated tasks and deliverables.',
      'Designed UX mockups and screens alongside development.'
    ],
    tags: ['Java', 'Spring Boot', 'React', 'TypeScript', 'Keycloak'],
    links: [],
    bg: C.paper,
    art: `<svg viewBox="0 0 600 450" aria-hidden="true">
      <path d="M150 140 L300 60 L450 140 Z" fill="${C.ink}"/>
      <rect x="150" y="140" width="300" height="18" fill="${C.ink}"/>
      <g fill="${C.blue}"><rect x="170" y="170" width="28" height="170"/><rect x="230" y="170" width="28" height="170"/><rect x="342" y="170" width="28" height="170"/><rect x="402" y="170" width="28" height="170"/></g>
      <path d="M275 340 V230 A25 25 0 0 1 325 230 V340 Z" fill="${C.orange}"/>
      <rect x="130" y="340" width="340" height="22" fill="${C.ink}"/>
      <rect x="110" y="362" width="380" height="18" fill="${C.ink}"/>
      <g transform="translate(470 70)"><path d="M40 0 L80 14 V48 C80 74 62 92 40 100 C18 92 0 74 0 48 V14 Z" fill="${C.orange}"/><circle cx="40" cy="44" r="12" fill="${C.cream}"/><rect x="36" y="50" width="8" height="24" fill="${C.cream}"/></g>
    </svg>`
  },
  {
    id: 'ledger',
    title: 'Double-Entry Ledger Service',
    kicker: 'Personal project · Backend',
    meta: [['Type', 'Payments API'], ['Lang', 'Java'], ['Data', 'PostgreSQL'], ['Run', 'Docker']],
    desc: 'Idempotent payment APIs on an append-only event log, so retries and concurrent requests can’t create duplicate or unbalanced transactions.',
    points: [
      'Automated reconciliation that flags discrepancies.',
      'Load-tested the service, wrote a threat model, then attacked my own API and fixed what I found.'
    ],
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Security'],
    links: [],
    bg: C.blue,
    art: `<svg viewBox="0 0 600 450" aria-hidden="true" font-family="Playfair Display, Georgia, serif">
      <rect x="90" y="60" width="420" height="320" rx="10" fill="${C.cream}"/>
      <path d="M300 60 V380" stroke="${C.ink}" stroke-width="3"/>
      <text x="195" y="105" text-anchor="middle" font-size="26" fill="${C.ink}">Debit</text>
      <text x="405" y="105" text-anchor="middle" font-size="26" fill="${C.ink}">Credit</text>
      <path d="M110 125 H490" stroke="${C.ink}" stroke-width="2"/>
      <g fill="${C.ink}" opacity=".3"><rect x="120" y="150" width="140" height="10" rx="5"/><rect x="120" y="185" width="110" height="10" rx="5"/><rect x="120" y="220" width="150" height="10" rx="5"/><rect x="330" y="150" width="130" height="10" rx="5"/><rect x="330" y="185" width="150" height="10" rx="5"/><rect x="330" y="220" width="100" height="10" rx="5"/></g>
      <path d="M110 270 H490" stroke="${C.ink}" stroke-width="2"/>
      <circle cx="300" cy="325" r="34" fill="${C.orange}"/>
      <text x="300" y="337" text-anchor="middle" font-size="34" font-weight="700" fill="${C.cream}">=</text>
      <text x="195" y="335" text-anchor="middle" font-size="22" fill="${C.ink}" font-style="italic">balanced</text>
      <text x="405" y="335" text-anchor="middle" font-size="22" fill="${C.ink}" font-style="italic">idempotent</text>
    </svg>`
  },
  {
    id: 'engagement-app',
    title: 'Community Engagement app',
    kicker: 'Al Akhawayn University · In progress',
    meta: [['Role', 'Technical project lead'], ['Year', '2026 –'], ['Scope', 'End to end'], ['Output', 'App + dashboards']],
    desc: 'A flagship initiative under the university’s strategic plan: an application that automates the Community Engagement Office’s full workflow.',
    points: [
      'Replacing decade-old, inconsistent databases with a structured, reliable data layer.',
      'Building dashboards and data visualizations for the office’s staff.',
      'Own requirements, planning, delivery and stakeholder communication.'
    ],
    tags: ['Project lead', 'Data', 'Dashboards', 'Tableau'],
    links: [],
    bg: C.orange,
    art: `<svg viewBox="0 0 600 450" aria-hidden="true">
      <rect x="70" y="60" width="460" height="320" rx="18" fill="${C.cream}"/>
      <rect x="70" y="60" width="110" height="320" rx="18" fill="${C.ink}"/><rect x="160" y="60" width="20" height="320" fill="${C.ink}"/>
      <g fill="${C.cream}" opacity=".6"><rect x="95" y="100" width="60" height="8" rx="4"/><rect x="95" y="130" width="45" height="8" rx="4"/><rect x="95" y="160" width="55" height="8" rx="4"/></g>
      <g fill="${C.blue}"><rect x="215" y="240" width="34" height="100" rx="4"/><rect x="265" y="200" width="34" height="140" rx="4"/><rect x="315" y="260" width="34" height="80" rx="4"/><rect x="365" y="170" width="34" height="170" rx="4"/></g>
      <circle cx="470" cy="150" r="42" fill="none" stroke="${C.blue}" stroke-width="18" opacity=".25"/>
      <circle cx="470" cy="150" r="42" fill="none" stroke="${C.orange}" stroke-width="18" stroke-dasharray="180 264" transform="rotate(-90 470 150)"/>
      <rect x="215" y="100" width="160" height="14" rx="7" fill="${C.ink}"/>
      <rect x="215" y="126" width="110" height="10" rx="5" fill="${C.ink}" opacity=".3"/>
    </svg>`
  }
];
