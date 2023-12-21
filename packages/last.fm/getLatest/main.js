export async function main() {
  try {
    const LASTFM_KEY = process.env.LASTFM_KEY
    const LASTFM_URL = process.env.LASTFM_URL
    const LASTFM_USER = process.env.LASTFM_USER

    if (!LASTFM_KEY || !LASTFM_URL || !LASTFM_USER) {
      return {
        'body': { 'error': 'Missing required environment variables.'}
      }
    }

    const RECENT_TRACKS_URL = `${LASTFM_URL}?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${LASTFM_KEY}&format=json&limit=5`

    const data = await fetch(RECENT_TRACKS_URL)
    const latestTracks = await data.json()
    return {
      'body': latestTracks
    }
  } catch (e) {
    console.error(e);
    return {
      'body': { 'error': 'There was a problem retrieving data.' },
      'statusCode': 400
    }
  }
}
