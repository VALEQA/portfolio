import type { ProfileData, Project, TechItem, ExperienceItem } from '../types/portfolio';

export const profileData: ProfileData = {
  name: 'Ahmad Faishal Baihaqi',
  tagline: 'Informatics Student (Sem 5) • Web & Mobile Developer',
  education: 'Teknik Informatika (S1) • Universitas Esa Unggul (Bekasi)',
  status: 'Open for Internship & Junior Developer Roles',
  bio: 'Mahasiswa Teknik Informatika (Semester 5) di Universitas Esa Unggul yang antusias dalam pengembangan web dinamis, aplikasi mobile, dan eksplorasi analisis data. Terbiasa membangun antarmuka web dan aplikasi fungsional yang terhubung dengan basis data relasional MySQL maupun cloud Firebase.',
  experienceStart: '2023 - Sekarang',
  avatarUrl: '/avatar.png',
  avatarChibiUrl: '/avatar-chibi.png',
  interests: [
    'Web Architecture',
    'Mobile Systems',
    'Data Analytics',
    'Database Design',
    'Interactive UI'
  ],
  contact: {
    email: 'afilhqy.4@gmail.com',
    github: 'https://github.com/VALEQA',
    linkedin: 'https://github.com/VALEQA',
    location: 'Cilincing, Jakarta Utara, Indonesia'
  }
};

export const techStackData: TechItem[] = [
  // client interface layer
  {
    name: 'HTML5',
    category: 'frontend',
    layer: 'client',
    iconKey: 'html5',
    color: '#E34F26',
    roleTag: 'Web Markup',
    usageContext: 'Struktur semantik dokumen web dan formulir reservasi interaktif',
    projectLinks: ['funcart']
  },
  {
    name: 'CSS3',
    category: 'frontend',
    layer: 'client',
    iconKey: 'css',
    color: '#1572B6',
    roleTag: 'Styling Core',
    usageContext: 'Tata letak responsif, flexbox, CSS grid, dan desain antarmuka bertema balap',
    projectLinks: ['funcart']
  },
  {
    name: 'JavaScript',
    category: 'frontend',
    layer: 'client',
    iconKey: 'javascript',
    color: '#F7DF1E',
    roleTag: 'Client Scripting',
    usageContext: 'Manipulasi DOM dinamis, validasi form booking tiket, dan interaktivitas event',
    projectLinks: ['funcart']
  },
  {
    name: 'Flutter',
    category: 'mobile',
    layer: 'client',
    iconKey: 'flutter',
    color: '#0284c7',
    roleTag: 'Native Mobile',
    usageContext: 'Aplikasi mobile lintas platform Android & iOS dengan arsitektur UI reaktif yang mulus',
    projectLinks: ['langkahawal']
  },
  {
    name: 'Dart',
    category: 'mobile',
    layer: 'client',
    iconKey: 'dart',
    color: '#0175C2',
    roleTag: 'Mobile Core',
    usageContext: 'Logika state management, penanganan asynchronous data streams, dan model data mobile',
    projectLinks: ['langkahawal']
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    layer: 'client',
    iconKey: 'tailwindcss',
    color: '#06B6D4',
    roleTag: 'Design Tokens',
    usageContext: 'Styling modern berbasis utility-first dan perancangan antarmuka visual yang cepat',
    projectLinks: ['funcart']
  },

  // backend engine layer
  {
    name: 'PHP',
    category: 'backend',
    layer: 'backend',
    iconKey: 'php',
    color: '#777BB4',
    roleTag: 'Backend Engine',
    usageContext: 'Logika backend sistem reservasi, routing request, sesi autentikasi, dan pemrosesan booking',
    projectLinks: ['funcart']
  },
  {
    name: 'Apache',
    category: 'backend',
    layer: 'backend',
    iconKey: 'apache',
    color: '#D22128',
    roleTag: 'Web Server',
    usageContext: 'Web server hosting lokal dan lingkungan deployment produksi berbasis Apache',
    projectLinks: ['funcart']
  },

  // database and cloud persistence layer
  {
    name: 'MySQL',
    category: 'backend',
    layer: 'database',
    iconKey: 'mysql',
    color: '#00758F',
    roleTag: 'Relational DB',
    usageContext: 'Skema database relasional untuk akun user, sistem booking tiket, dan data papan peringkat balapan',
    projectLinks: ['funcart']
  },
  {
    name: 'Firebase',
    category: 'backend',
    layer: 'database',
    iconKey: 'firebase',
    color: '#FFCA28',
    roleTag: 'Cloud NoSQL & Auth',
    usageContext: 'Firebase Authentication untuk otentikasi akun orang tua dan Cloud Firestore untuk sinkronisasi data tumbuh kembang anak',
    projectLinks: ['langkahawal']
  },
  {
    name: 'Python',
    category: 'backend',
    layer: 'database',
    iconKey: 'python',
    color: '#3776AB',
    roleTag: 'Data & Scripting',
    usageContext: 'Eksplorasi analisis data, scripting otomatisasi, query data, dan pemodelan analitik dasar',
    projectLinks: ['funcart']
  },

  // infrastructure and devops layer
  {
    name: 'Git',
    category: 'tools',
    layer: 'devops',
    iconKey: 'git',
    color: '#F05032',
    roleTag: 'Version Control',
    usageContext: 'Manajemen versi kode, branching fitur, pull request, dan koordinasi repositori tim',
    projectLinks: ['funcart', 'langkahawal']
  },
  {
    name: 'XAMPP',
    category: 'tools',
    layer: 'devops',
    iconKey: 'xampp',
    color: '#FB7A24',
    roleTag: 'Local Environment',
    usageContext: 'Lingkungan server lokal Apache & MariaDB/MySQL untuk pengembangan dan testing web PHP',
    projectLinks: ['funcart']
  },
  {
    name: 'Figma',
    category: 'tools',
    layer: 'devops',
    iconKey: 'figma',
    color: '#F24E1E',
    roleTag: 'UI/UX Design',
    usageContext: 'Perancangan wireframe antarmuka web, screen mobile, dan visual alur pengguna',
    projectLinks: ['funcart', 'langkahawal']
  },
  {
    name: 'Postman',
    category: 'tools',
    layer: 'devops',
    iconKey: 'postman',
    color: '#FF6C37',
    roleTag: 'API Client',
    usageContext: 'Pengujian endpoint REST API dan validasi struktur pertukaran payload data JSON',
    projectLinks: ['langkahawal']
  }
];

export const projectsData: Project[] = [
  {
    id: 'funcart',
    title: 'FunCart (Full Throttle)',
    subtitle: 'Indoor Go-Kart Racing Hub & Online Booking Platform',
    category: 'fullstack',
    summary: 'Sistem informasi dan platform reservasi sirkuit go-kart berbasis web dengan fitur pemesanan tiket online, papan peringkat balapan, dan panel administrasi.',
    description: 'Proyek tugas besar mata kuliah Pemrograman Web yang mendigitalkan operasional fasilitas balap go-kart indoor. Menyediakan alur booking jadwal balap yang terstruktur, pencatatan waktu putaran (lap times) dan peringkat pembalap, serta panduan keselamatan lintasan interaktif.',
    architecture: [
      'Frontend responsif dibangun dengan HTML5 semantik, CSS3 modern, dan JavaScript dinamis',
      'Backend modular PHP untuk penanganan alur booking, autentikasi sesi, dan kalkulasi tarif',
      'Database relasional MySQL dengan skema relasi akun, jadwal reservasi, dan rekap balapan',
      'Dashboard pengguna untuk memantau status pemesanan dan riwayat reservasi',
      'Papan peringkat hasil balapan (leaderboard) yang dinamis dan terintegrasi'
    ],
    stack: [
      'PHP',
      'MySQL',
      'JavaScript',
      'CSS3',
      'HTML5',
      'Apache',
      'XAMPP'
    ],
    highlights: [
      'Proyek Mata Kuliah Pemrograman Web (Kelas KH002)',
      'Alur pemesanan jadwal balap online dengan kalkulasi biaya instan',
      'Papan peringkat waktu putaran (lap time) & modul keselamatan lintasan'
    ],
    challenges: 'Membangun alur logika booking dan relasi database multi-tabel dari awal menggunakan PHP murni dan MySQL, serta memastikan antarmuka tetap responsif di berbagai perangkat.',
    role: 'Full-Stack Web Developer',
    demoUrl: 'https://funcart.site/?i=1',
    githubUrl: 'https://github.com/VALEQA/Gokart',
    imageUrl: '/projects/funcart.png',
    imageFit: 'contain',
    featured: true,
    metrics: [
      { label: 'Platform Web', value: 'PHP & MySQL' },
      { label: 'Sistem Layanan', value: 'Online Booking' },
      { label: 'Fitur Utama', value: 'Race Leaderboard' }
    ]
  },
  {
    id: 'langkahawal',
    title: 'LangkahAwal',
    subtitle: 'Aplikasi Mobile Pemantauan Tumbuh Kembang & Milestone Anak',
    category: 'mobile',
    summary: 'Aplikasi mobile multiplatform berbasis Flutter dan Firebase untuk membantu orang tua mencatat profil anak serta memantau fase tumbuh kembang dan milestone harian.',
    description: 'Project Akhir Mata Kuliah Pemrograman Mobile yang dikembangkan bersama tim. Menggunakan Flutter untuk antarmuka yang responsif dan Firebase sebagai backend real-time untuk mendukung autentikasi, manajemen profil anak, serta pelacakan milestone perkembangan balita.',
    architecture: [
      'Aplikasi mobile multiplatform dibangun dengan Flutter SDK dan bahasa Dart',
      'Arsitektur modular feature-driven (auth, child_profile, milestone, tracking)',
      'Firebase Authentication untuk otentikasi akun orang tua yang aman',
      'Cloud Firestore NoSQL real-time database untuk sinkronisasi data tumbuh kembang',
      'Firebase Storage untuk penyimpanan foto dan dokumentasi profil anak'
    ],
    stack: [
      'Flutter',
      'Dart',
      'Firebase Auth',
      'Cloud Firestore',
      'Firebase Storage',
      'Mobile Architecture'
    ],
    highlights: [
      'Project Akhir Mata Kuliah Pemrograman Mobile',
      'Pencatatan fase tumbuh kembang dan milestone anak yang terstruktur',
      'Sinkronisasi cloud real-time antar perangkat orang tua'
    ],
    challenges: 'Merancang arsitektur aplikasi mobile berbasis fitur (feature-first) menggunakan Flutter dan mengintegrasikan multi-layanan Firebase dalam kolaborasi tim git.',
    role: 'Mobile Application Developer',
    githubUrl: 'https://github.com/antiquiraxe-cyber/Sakha-Yusuf-Kelompok-2-KH002',
    isMobileApp: true,
    demoStatusLabel: 'Aplikasi Mobile Flutter (In Active Development)',
    imageUrl: '/projects/langkahawal.svg',
    imageFit: 'contain',
    featured: true,
    metrics: [
      { label: 'Mobile Engine', value: 'Flutter & Dart' },
      { label: 'Cloud Backend', value: 'Firebase Suite' },
      { label: 'Fokus Solusi', value: 'Child Milestones' }
    ]
  }
];

export const experienceData: ExperienceItem[] = [
  {
    id: 'edu-esaunggul',
    period: '2023 - Sekarang',
    role: 'S1 Teknik Informatika (Semester 5)',
    organization: 'Universitas Esa Unggul - Kampus Bekasi',
    badge: 'Pendidikan Formal',
    category: 'education',
    description:
      'Menempuh studi sarjana Teknik Informatika dengan fokus pada rekayasa perangkat lunak, pemrograman web, mobile application development, serta perancangan basis data dan dasar-dasar analitik data.',
    highlights: [
      'Pemrograman Web Berbasis PHP, JavaScript & MySQL',
      'Pengembangan Aplikasi Mobile dengan Flutter & Dart',
      'Eksplorasi Basis Data Relasional & Analisis Data'
    ],
    tech: ['Web Programming', 'Mobile Dev', 'PHP', 'Flutter', 'MySQL', 'JavaScript', 'Database Systems', 'Algorithms']
  },
  {
    id: 'proj-funcart',
    period: '2024 / Semester Aktif',
    role: 'Full-Stack Web Developer',
    organization: 'Proyek Web Aplikasi FunCart (Full Throttle)',
    badge: 'Project Akademik & Publikasi',
    category: 'project',
    description:
      'Membangun sistem informasi dan pemesanan sirkuit go-kart secara end-to-end mulai dari perancangan skema database MySQL, antarmuka pengguna interaktif, hingga deployment publik di funcart.site.',
    highlights: [
      'Implementasi Sistem Reservasi & Manajemen Tiket Balap',
      'Pengembangan Fitur Leaderboard Waktu Putaran (Lap Times)',
      'Deployment & Konfigurasi Server Hosting Publik'
    ],
    tech: ['PHP', 'MySQL', 'JavaScript', 'CSS3', 'HTML5', 'Apache', 'XAMPP']
  },
  {
    id: 'proj-langkahawal',
    period: '2024 - Sekarang',
    role: 'Mobile App Developer',
    organization: 'Proyek Aplikasi Mobile LangkahAwal',
    badge: 'Project Akhir Pemrograman Mobile',
    category: 'project',
    description:
      'Berkolaborasi dalam tim mengembangkan aplikasi mobile Flutter untuk pelacakan tumbuh kembang anak dengan integrasi Firebase Auth, Firestore, dan Storage.',
    highlights: [
      'Penerapan Arsitektur Modular Feature-Driven di Flutter',
      'Integrasi Layanan Firebase Auth & Cloud Firestore Real-time',
      'Kolaborasi Git & Manajemen Repositori Bersama'
    ],
    tech: ['Flutter', 'Dart', 'Firebase Auth', 'Firestore', 'Firebase Storage', 'Git']
  }
];
