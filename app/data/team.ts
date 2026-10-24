export type TeamMember = {
    name: string
    role: string
    url?: string
    lead?: boolean
}

export type Team = {
    size: number
    members: TeamMember[]
}
