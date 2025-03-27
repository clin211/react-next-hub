export async function GET() {
    const data = {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    }

    return Response.json(data)
}
