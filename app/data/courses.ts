import data from './courses.json'

export type Course = {
    title: string
    platform: string
    year: string
    hours: string
    status: 'completed' | 'in progress'
    description: string
    skills: string[]
    url?: string
}

export const courses = data as Course[]
