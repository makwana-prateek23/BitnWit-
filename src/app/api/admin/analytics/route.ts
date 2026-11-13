import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookieName, verifySessionToken } from '@/lib/db/auth';
import { store } from '@/lib/db/store';

export async function GET(req: NextRequest) {
  try {
    const cookieName = getSessionCookieName();
    const token = req.cookies.get(cookieName)?.value;
    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { items: allLeads } = await store.getLeads({ limit: 10000 });
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let thisMonthCount = 0;
    let convertedCount = 0;
    const servicesCount: Record<string, number> = {};
    const sourcesCount: Record<string, number> = {};

    for (const lead of allLeads) {
      const d = new Date(lead.dateReceived || lead.createdAt);
      if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
        thisMonthCount++;
      }
      if (lead.status === 'CONVERTED') {
        convertedCount++;
      }

      // Services distribution
      const srv = lead.interestedService || 'General';
      servicesCount[srv] = (servicesCount[srv] || 0) + 1;

      // Sources
      const src = lead.leadSource || 'WEBSITE';
      sourcesCount[src] = (sourcesCount[src] || 0) + 1;
    }

    const totalLeads = allLeads.length;
    const conversionRate = totalLeads > 0 ? ((convertedCount / totalLeads) * 100).toFixed(1) : '0.0';

    const topServices = Object.entries(servicesCount)
      .map(([service, count]) => ({ service, count }))
      .sort((a, b) => b.count - a.count);

    const channelPreferences = Object.entries(sourcesCount)
      .map(([channel, count]) => ({
        channel,
        count,
        percent: totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    return NextResponse.json({
      success: true,
      metrics: {
        totalLeads,
        thisMonthCount,
        convertedCount,
        conversionRate,
      },
      topServices,
      channelPreferences,
    });
  } catch (err) {
    console.error('Analytics GET error:', err);
    return NextResponse.json({ error: 'Failed to retrieve analytics.' }, { status: 500 });
  }
}
