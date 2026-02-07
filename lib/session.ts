import { cookies } from 'next/headers'
import { db } from './db'
import { v4 as uuidv4 } from 'uuid'

const SESSION_COOKIE_NAME = 'zeoqr_session_id'
const SESSION_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

export async function getOrCreateSession(): Promise<string> {
  const cookieStore = await cookies()
  let sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value

  const setCookie = (id: string) => {
    cookieStore.set(SESSION_COOKIE_NAME, id, {
      maxAge: SESSION_MAX_AGE,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
  }

  try {
    if (!sessionId) {
      sessionId = uuidv4()
      await db.session.create({
        data: { id: sessionId },
      })
      setCookie(sessionId)
      return sessionId
    }

    try {
      const session = await db.session.findUnique({
        where: { id: sessionId },
      })
      if (!session) {
        sessionId = uuidv4()
        await db.session.create({
          data: { id: sessionId },
        })
        setCookie(sessionId)
      }
    } catch (error) {
      // DB unreachable: use cookie-only session so app keeps working (tracking won't persist)
      if (process.env.NODE_ENV === 'development') {
        console.warn('getOrCreateSession: database unreachable, using cookie-only session', error)
      }
      sessionId = uuidv4()
      setCookie(sessionId)
    }

    return sessionId
  } catch (error) {
    // Fallback: return cookie-only session so MVP never crashes
    console.error('getOrCreateSession error:', error)
    const fallbackId = uuidv4()
    setCookie(fallbackId)
    return fallbackId
  }
}

export async function getSessionId() {
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE_NAME)?.value
}
