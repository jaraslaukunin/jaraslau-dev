import { type Team } from './team'
import data from './profile.json'

export type Social = {
    id: string
    label: string
    handle: string
    url: string
    note: string
}

export type StackSkill = {
    name: string
    level: number // 1..10
}

export type StackGroup = {
    title: string
    command: string
    skills: StackSkill[]
}

export type LanguageSkill = {
    name: string
    code: string
    level: string
    note: string
}

export type CareerEntry = {
    hash: string
    period: string
    title: string
    description: string
    current?: boolean
}

export type EventEntry = {
    name: string
    date: string // YYYY-MM (or YYYY-MM-DD for day precision)
    ended?: string
    ongoing?: boolean
    place: string
    result?: string
    description: string
    url?: string
    team: Team
}

export const socials = data.socials as Social[]
export const stack = data.stack as StackGroup[]
export const languages = data.languages as LanguageSkill[]
export const career = data.career as CareerEntry[]
export const events = data.events as EventEntry[]
