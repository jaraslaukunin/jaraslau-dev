import type { Team } from './team'
import data from './projects.json'

export type Project = {
    slug: string
    name: string
    type: string
    description: string
    badges?: string[]
    stack: string[]
    tools?: string[]
    status: 'completed' | 'in progress' | 'open source'
    year: string
    started?: string
    ended?: string
    ongoing?: boolean
    role: string
    features: string[]
    repo: string
    site?: string
    language: string
    stars: number
    updated: string
    team: Team
}

export const projects = data as Project[]
