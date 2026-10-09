// Tracks the real work the loader waits on, and signals when the intro can play.
const TASKS = ['fonts', 'engine', 'scene']
const done = new Set()
const progressListeners = new Set()
const introListeners = new Set()
let introStarted = false

export const bootProgress = () => done.size / TASKS.length

export function markReady(task) {
  if (done.has(task)) return
  done.add(task)
  progressListeners.forEach((fn) => fn(bootProgress(), task))
}

export function onProgress(fn) {
  progressListeners.add(fn)
  return () => progressListeners.delete(fn)
}

export function startIntro() {
  if (introStarted) return
  introStarted = true
  introListeners.forEach((fn) => fn())
}

// Runs immediately if the intro already started (e.g. loader skipped).
export function onIntro(fn) {
  if (introStarted) {
    fn()
    return () => {}
  }
  introListeners.add(fn)
  return () => introListeners.delete(fn)
}

const SESSION_KEY = 'mr-loader-seen'
export function loaderSeen() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}
export function rememberLoader() {
  try {
    sessionStorage.setItem(SESSION_KEY, '1')
  } catch {
    /* storage unavailable */
  }
}

// fonts: actually request the faces the design uses, don't just wait on an idle promise
if (typeof document !== 'undefined' && document.fonts) {
  Promise.all([
    document.fonts.load('600 1em "Playfair Display"'),
    document.fonts.load('italic 500 1em "Playfair Display"'),
    document.fonts.load('400 1em Inter'),
    document.fonts.load('500 1em "JetBrains Mono"'),
  ])
    .catch(() => {})
    .then(() => markReady('fonts'))
} else {
  markReady('fonts')
}

// never let the loader hang if something stalls
setTimeout(() => TASKS.forEach(markReady), 7000)
