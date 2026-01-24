import { cookies } from 'next/headers'
import { db } from './db'
import { v4 as uuidv4 } from 'uuid'

const SESSION_COOKIE_NAME = 'zeoqr_session_id'
const SESSION_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

export async function getOrCreateSession() {
  try {
    const cookieStore = await cookies()
    let sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value

    if (!sessionId) {
      sessionId = uuidv4()
      await db.session.create({
        data: { id: sessionId },
      })
      cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
        maxAge: SESSION_MAX_AGE,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      })
    } else {
      // Verify session exists
      try {
        const session = await db.session.findUnique({
          where: { id: sessionId },
        })
        if (!session) {
          // Session was deleted, create new one
          sessionId = uuidv4()
          await db.session.create({
            data: { id: sessionId },
          })
          cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
            maxAge: SESSION_MAX_AGE,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
          })
        }
      } catch (error) {
        // If session lookup fails, create new session
        console.error('Session lookup failed, creating new session:', error)
        sessionId = uuidv4()
        await db.session.create({
          data: { id: sessionId },
        })
        cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
          maxAge: SESSION_MAX_AGE,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        })
      }
    }

    return sessionId
  } catch (error) {
    console.error('getOrCreateSession error:', error)
    throw error
  }
}

export async function getSessionId() {
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE_NAME)?.value
}
