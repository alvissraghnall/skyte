import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

function extractTrackId(url: string): string | null {
  try {
    const parsed = new URL(url)
    if (parsed.hostname === 'open.spotify.com' && parsed.pathname.startsWith('/track/')) {
      const parts = parsed.pathname.split('/')
      return parts[2]
    }
  } catch (e) {
    return null
  }
  return null
}

async function getSpotifyToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('Spotify API credentials are not configured.')
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch Spotify access token')
  }

  const data = await response.json()
  return data.access_token
}

export const getSpotifyTrack = createServerFn({ method: 'GET' })
  .inputValidator((d: string) => z.string().parse(d))
  .handler(async ({ data: url }) => {
    const trackId = extractTrackId(url)

    if (!trackId) {
      throw new Error('Invalid Spotify URL. Please provide a valid track link.')
    }

    const token = await getSpotifyToken()

    const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch track data from Spotify.')
    }

    const track = await response.json()

    return {
      title: track.name,
      artist: track.artists.map((a: any) => a.name).join(', '),
      albumArt: track.album.images[0]?.url || '',
    }
  })
