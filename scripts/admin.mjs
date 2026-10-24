#!/usr/bin/env node
// jaraslau.dev content admin — edit portfolio data without touching code.
// Usage: npm run admin

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import readline from 'node:readline'
import { spawnSync } from 'node:child_process'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PROJECTS_FILE = join(ROOT, 'app/data/projects.json')
const PROFILE_FILE = join(ROOT, 'app/data/profile.json')

const ACCENT = '\x1b[38;2;163;255;18m'
const MUTED = '\x1b[90m'
const BOLD = '\x1b[1m'
const RESET = '\x1b[0m'

// Line-queue readline: works the same interactively and with piped input.
const rl = readline.createInterface({ input: process.stdin })
const queuedLines = []
let lineWaiter = null
let inputClosed = false

rl.on('line', (line) => {
    if (lineWaiter) {
        const resolve = lineWaiter
        lineWaiter = null
        resolve(line)
    } else {
        queuedLines.push(line)
    }
})

rl.on('close', () => {
    inputClosed = true
    while (lineWaiter) {
        const resolve = lineWaiter
        lineWaiter = null
        resolve('')
    }
})

const readLine = (prompt) =>
    new Promise((resolve) => {
        if (queuedLines.length) return resolve(queuedLines.shift())
        if (inputClosed) return resolve('')
        process.stdout.write(prompt)
        lineWaiter = resolve
    })

const load = (file) => JSON.parse(readFileSync(file, 'utf8'))
const save = (file, data) =>
    writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8')

const ask = async (question, fallback) => {
    const suffix = fallback !== undefined ? ` ${MUTED}[${fallback}]${RESET}` : ''
    const answer = (await readLine(`${question}${suffix}: `)).trim()
    return answer === '' && fallback !== undefined ? String(fallback) : answer
}

const kebab = (value) =>
    value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

const printHeader = (title) =>
    console.log(`\n${MUTED}~/jaraslau-dev $${RESET} ${ACCENT}${title}${RESET}`)

const listProjects = () => {
    const projects = load(PROJECTS_FILE)
    printHeader(`ls ./projects -la (${projects.length} entries)`)
    projects.forEach((p, i) => {
        const badges = (p.badges ?? []).map((b) => `#${b}`).join(' ')
        const team = p.team.size > 1 ? `team · ${p.team.size}` : 'solo'
        console.log(
            `  ${MUTED}${String(i + 1).padStart(2)}.${RESET} ${BOLD}${p.name}${RESET} ${MUTED}(${p.slug})${RESET} ${ACCENT}${badges}${RESET} ${MUTED}${team} · ${p.status} · ${p.year}${RESET}`,
        )
    })
    return projects
}

const buildTeam = async () => {
    const mode = await ask('Team: 1 = solo, 2 = enter members', '1')
    if (mode === '1') {
        const role = await ask('Your role in the project', 'design, architecture, development')
        return {
            size: 1,
            members: [
                {
                    name: 'Jaraslau Kunin',
                    role,
                    url: 'https://github.com/jaraslaukunin',
                    lead: true,
                },
            ],
        }
    }

    const members = []
    console.log(`  ${MUTED}Enter members one by one. Empty name finishes.${RESET}`)
    for (;;) {
        const name = await ask(`  Member ${members.length + 1} name`)
        if (!name) break
        const role = await ask(`  ${name} role`)
        const url = await ask(`  ${name} link (github/linkedin)`, '')
        const lead = (await ask(`  Is ${name} the team lead? y/N`, 'n')).toLowerCase() === 'y'
        const member = { name, role }
        if (url) member.url = url
        if (lead) member.lead = true
        members.push(member)
    }
    return { size: members.length, members }
}

const addProject = async () => {
    printHeader('touch ./projects/new && edit')
    const projects = load(PROJECTS_FILE)

    const name = await ask('Project name')
    const slug = kebab(await ask('Slug', kebab(name)))

    if (projects.some((p) => p.slug === slug)) {
        console.log(`  ${MUTED}! slug "${slug}" already exists — aborted${RESET}`)
        return
    }

    const type = await ask('Type (e.g. "web / landing", "fintech / hackathon")')
    const description = await ask('Description (one or two sentences)')
    const badgesRaw = await ask('Badges, comma-separated (e.g. "course, hackathon")', '')
    const stackRaw = await ask('Stack, comma-separated (e.g. "Python, Django")')
    const toolsRaw = await ask('Tools, comma-separated, kebab-case (e.g. "jetbrains-pycharm, docker")', '')
    const status = await ask('Status: completed / in progress / open source', 'completed')
    const year = await ask('Year', String(new Date().getFullYear()))
    const role = await ask('Your role')
    const repo = await ask('Repo URL')
    const site = await ask('Site URL', '')
    const language = await ask('Main language (as GitHub shows it)')
    const stars = Number(await ask('Stars', '0'))

    const features = []
    console.log(`  ${MUTED}Features — one per line, empty line finishes.${RESET}`)
    for (;;) {
        const feature = await ask(`  Feature ${features.length + 1}`)
        if (!feature) break
        features.push(feature)
    }

    const team = await buildTeam()

    const project = {
        slug,
        name,
        type,
        description,
        stack: stackRaw.split(',').map((s) => s.trim()).filter(Boolean),
        status: ['completed', 'in progress', 'open source'].includes(status)
            ? status
            : 'completed',
        year,
        role,
        features,
        repo,
        language,
        stars: Number.isFinite(stars) ? stars : 0,
        updated: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`,
        team,
    }
    const badges = badgesRaw.split(',').map((b) => kebab(b)).filter(Boolean)
    if (badges.length) project.badges = badges
    const tools = toolsRaw.split(',').map((t) => kebab(t)).filter(Boolean)
    if (tools.length) project.tools = tools
    if (site) project.site = site

    projects.unshift(project)
    save(PROJECTS_FILE, projects)
    console.log(`  ${ACCENT}✔ added "${name}" (${projects.length} total)${RESET}`)
}

const editBadges = async () => {
    const projects = load(PROJECTS_FILE)
    listProjects()
    const index = Number(await ask('\nProject number')) - 1
    const project = projects[index]
    if (!project) return console.log('  ! no such project')

    printHeader(`edit badges: ${project.name}`)
    const action = await ask('add / remove', 'add')
    if (action === 'remove') {
        project.badges = project.badges ?? []
        if (!project.badges.length) return console.log('  ! no badges yet')
        project.badges.forEach((b, i) => console.log(`  ${i + 1}. #${b}`))
        const badgeIndex = Number(await ask('Badge number to remove')) - 1
        if (project.badges[badgeIndex] !== undefined) {
            project.badges.splice(badgeIndex, 1)
            if (!project.badges.length) delete project.badges
        }
    } else {
        const badge = kebab(await ask('New badge (any word — it becomes #kebab-case)'))
        if (!badge) return console.log('  ! empty badge')
        project.badges = [...(project.badges ?? []), badge]
    }
    save(PROJECTS_FILE, projects)
    console.log(`  ${ACCENT}✔ badges: ${(project.badges ?? []).map((b) => `#${b}`).join(' ') || '—'}${RESET}`)
}

const editProjectTools = async () => {
    const projects = load(PROJECTS_FILE)
    listProjects()
    const index = Number(await ask('\nProject number')) - 1
    const project = projects[index]
    if (!project) return console.log('  ! no such project')

    printHeader(`edit tools: ${project.name}`)
    const action = await ask('add / remove', 'add')
    if (action === 'remove') {
        project.tools = project.tools ?? []
        if (!project.tools.length) return console.log('  ! no tools yet')
        project.tools.forEach((t, i) => console.log(`  ${i + 1}. ${t}`))
        const toolIndex = Number(await ask('Tool number to remove')) - 1
        if (project.tools[toolIndex] !== undefined) {
            project.tools.splice(toolIndex, 1)
            if (!project.tools.length) delete project.tools
        }
    } else {
        const tool = kebab(await ask('New tool, kebab-case (e.g. "jetbrains-webstorm-community")'))
        if (!tool) return console.log('  ! empty tool')
        project.tools = [...(project.tools ?? []), tool]
    }
    save(PROJECTS_FILE, projects)
    console.log(`  ${ACCENT}✔ tools: ${(project.tools ?? []).join(', ') || '—'}${RESET}`)
}

const editStackLevels = async () => {
    const profile = load(PROFILE_FILE)
    printHeader('edit ./stack --levels')
    profile.stack.forEach((group, gi) => {
        console.log(`  ${gi + 1}. ${group.title}`)
        group.skills.forEach(
            (s) => console.log(`      ${s.name.padEnd(20)} ${'█'.repeat(s.level)}${MUTED}${'░'.repeat(10 - s.level)}${RESET} ${s.level}/10`),
        )
    })
    const groupIndex = Number(await ask('\nGroup number')) - 1
    const group = profile.stack[groupIndex]
    if (!group) return console.log('  ! no such group')

    group.skills.forEach((s, i) => console.log(`  ${i + 1}. ${s.name} — ${s.level}/10`))
    const skillIndex = Number(await ask('Skill number')) - 1
    const skill = group.skills[skillIndex]
    if (!skill) return console.log('  ! no such skill')

    const level = Number(await ask(`New level for ${skill.name} (1-10)`, String(skill.level)))
    if (!Number.isInteger(level) || level < 1 || level > 10) {
        return console.log('  ! level must be an integer 1-10')
    }
    skill.level = level
    save(PROFILE_FILE, profile)
    console.log(`  ${ACCENT}✔ ${skill.name} = ${level}/10${RESET}`)
}

const addStackSkill = async () => {
    const profile = load(PROFILE_FILE)
    printHeader('add ./stack/skill')
    profile.stack.forEach((group, gi) =>
        console.log(`  ${gi + 1}. ${group.title} ${MUTED}(${group.skills.length} skills)${RESET}`),
    )
    const groupIndex = Number(await ask('\nGroup number')) - 1
    const group = profile.stack[groupIndex]
    if (!group) return console.log('  ! no such group')

    const name = await ask('Skill name (e.g. "Go" or "Docker")')
    if (!name) return console.log('  ! empty name')

    const level = Number(await ask(`Level for ${name} (1-10)`, '5'))
    if (!Number.isInteger(level) || level < 1 || level > 10) {
        return console.log('  ! level must be an integer 1-10')
    }

    group.skills.push({ name, level })
    save(PROFILE_FILE, profile)
    console.log(`  ${ACCENT}✔ ${name} = ${level}/10 added to "${group.title}"${RESET}`)
    if (group.skills.length > 6) {
        console.log(`  ${MUTED}note: ${group.skills.length} skills — the card just grows taller, same scale${RESET}`)
    }
}

const commitAndPush = async () => {
    printHeader('git add app/data && git commit && git push')
    const message = await ask('Commit message', 'content: update portfolio data')

    const run = (command, args) => {
        const result = spawnSync(command, args, { cwd: ROOT, stdio: 'inherit' })
        if (result.status !== 0) {
            console.log(`  ! "${command} ${args.join(' ')}" failed`)
            process.exit(result.status ?? 1)
        }
    }

    run('git', ['add', 'app/data'])
    run('git', ['commit', '-m', message])
    run('git', ['push', 'origin', 'main'])
    console.log(`  ${ACCENT}✔ pushed — GitHub Pages will redeploy automatically${RESET}`)
}

const MENU = `

${BOLD}jaraslau.dev admin${RESET} ${MUTED}— edit content without touching code${RESET}

  1. list projects          5. edit stack levels
  2. add project            6. add stack skill
  3. edit project badges    7. commit & push
  4. edit project tools     8. rebuild site (npm run generate)
  0. exit`

const main = async () => {
    console.log(MENU)
    for (;;) {
        const choice = (await readLine(`\n${ACCENT}?${RESET} action `)).trim()
        try {
            if (choice === '0' || choice === 'exit') break
            if (inputClosed && !choice) break
            if (choice === '1') listProjects()
            else if (choice === '2') await addProject()
            else if (choice === '3') await editBadges()
            else if (choice === '4') await editProjectTools()
            else if (choice === '5') await editStackLevels()
            else if (choice === '6') await addStackSkill()
            else if (choice === '7') await commitAndPush()
            else if (choice === '8') {
                printHeader('npm run generate')
                const result = spawnSync('npm', ['run', 'generate'], { cwd: ROOT, stdio: 'inherit' })
                if (result.status === 0) console.log(`  ${ACCENT}✔ site rebuilt into .output/public${RESET}`)
            } else console.log(`  ${MUTED}unknown action${RESET}`)
        } catch (error) {
            console.log(`  ! ${error.message}`)
        }
    }
    rl.close()
    console.log(`\n${MUTED}bye$${RESET}\n`)
}

main()
