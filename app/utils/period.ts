export type PeriodLike = {
    year?: string
    started?: string
    ended?: string
    ongoing?: boolean
}

export const periodLabel = (p: PeriodLike): string => {
    if (p.started) {
        if (p.ongoing) return `${p.started} — now`
        if (p.ended && p.ended !== p.started) return `${p.started} — ${p.ended}`
        return p.started
    }
    return p.year ?? ''
}

export const periodStartKey = (p: PeriodLike): string =>
    p.started ?? p.year ?? '0000'

export const periodEndKey = (p: PeriodLike): string => {
    if (p.ongoing) return '9999-99'
    return p.ended ?? p.started ?? p.year ?? '0000'
}

// Newest first in life = first on the site; older entries shift right/down.
export const byPeriodDesc = (a: PeriodLike, b: PeriodLike): number =>
    periodEndKey(b).localeCompare(periodEndKey(a))
        || periodStartKey(b).localeCompare(periodStartKey(a))
