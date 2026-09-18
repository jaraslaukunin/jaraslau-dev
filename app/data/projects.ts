export type Project = {
    slug: string
    name: string
    type: string
    description: string
    stack: string[]
    status: 'completed' | 'in progress' | 'open source'
    year: string
    role: string
    features: string[]
    repo: string
    site?: string
    language: string
    stars: number
    updated: string
}

export const projects: Project[] = [
    {
        slug: 'trackly',
        name: 'Trackly',
        type: 'healthtech / desktop',
        description:
            'Cross-platform application for epilepsy monitoring: seizures, medication, examinations, reminders and patient workflows.',
        stack: ['C++', 'Qt 6', 'SQLite', 'UI/UX'],
        status: 'completed',
        year: '2026',
        role: 'Product design, architecture and desktop development',
        features: [
            'Seizure and medication tracking',
            'Examination uploads and structured health history',
            'Reminders and appointment planning',
            'Russian, English and Belarusian localization',
            'Light, dark and Epilepsy Day visual themes',
        ],
        repo: 'https://github.com/jaraslaukunin/trackly-site',
        site: 'https://tracklyapp.xyz',
        language: 'HTML',
        stars: 0,
        updated: '2026-09',
    },
    {
        slug: 'avela',
        name: 'Avela',
        type: 'healthtech / telegram bot',
        description:
            'Telegram bot for medical appointment booking, reminders and clinic information.',
        stack: ['Python', 'Telegram Bot API'],
        status: 'in progress',
        year: '2026',
        role: 'Product concept, architecture and development',
        features: [
            'Medical appointment booking flow',
            'Appointment reminders and notifications',
            'Clinic and specialist information',
            'Russian and English interface',
        ],
        repo: 'https://github.com/jaraslaukunin/avela-telegram-bot',
        language: 'Python',
        stars: 0,
        updated: '2026-09',
    },
    {
        slug: 'calcify',
        name: 'Calcify',
        type: 'devtooling / mobile builds',
        description:
            'Simple solution for exporting Kivy apps to Android, iOS and other platforms using macOS tooling.',
        stack: ['Python', 'Kivy', 'macOS'],
        status: 'completed',
        year: '2026',
        role: 'Tooling design and development',
        features: [
            'Exports Kivy apps to Android and iOS',
            'macOS-first build workflow',
            'Simple, reproducible commands',
        ],
        repo: 'https://github.com/jaraslaukunin/calcify-app',
        language: 'Python',
        stars: 0,
        updated: '2026-09',
    },
    {
        slug: 'mrc-schedule',
        name: 'MRC Schedule',
        type: 'web / education',
        description:
            'College timetable solution adapted for Minsk Radioengineering College. Built with Django.',
        stack: ['Python', 'Django', 'HTML/CSS'],
        status: 'in progress',
        year: '2026',
        role: 'Full-stack development and domain adaptation',
        features: [
            'Base timetable solution for colleges',
            'Adapted for Minsk Radioengineering College',
            'Django admin for schedule management',
        ],
        repo: 'https://github.com/jaraslaukunin/mrc-schedule',
        language: 'CSS',
        stars: 0,
        updated: '2026-09',
    },
]
