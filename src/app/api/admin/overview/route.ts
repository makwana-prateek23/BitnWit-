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

    const overview = await store.getOverviewStats();
    const { items: recentLeads } = await store.getLeads({ limit: 5 });
    const { items: recentProjects } = await store.getProjects({ limit: 4 });
    const recentActivity = await store.getActivityLogs(8);

    // Calculate lead status distribution from actual leads
    const allLeadsResult = await store.getLeads({ limit: 1000 });
    const statusCounts: Record<string, number> = {
      NEW: 0,
      CONTACTED: 0,
      QUALIFIED: 0,
      PROPOSAL_SENT: 0,
      NEGOTIATION: 0,
      CONVERTED: 0,
      LOST: 0,
    };

    // Calculate monthly leads (past 6 months)
    const monthMap: Record<string, number> = {};
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${months[d.getMonth()]} ${d.getFullYear().toString().slice(2)}`;
      monthMap[key] = 0;
    }

    for (const lead of allLeadsResult.items) {
      if (statusCounts[lead.status] !== undefined) {
        statusCounts[lead.status]++;
      }
      const leadDate = new Date(lead.dateReceived || lead.createdAt);
      const leadMonthKey = `${months[leadDate.getMonth()]} ${leadDate.getFullYear().toString().slice(2)}`;
      if (monthMap[leadMonthKey] !== undefined) {
        monthMap[leadMonthKey]++;
      }
    }

    const monthlyLeads = Object.entries(monthMap).map(([month, count]) => ({
      month,
      count,
    }));

    return NextResponse.json({
      success: true,
      stats: {
        totalLeads: overview.totalLeads,
        newLeads: overview.newLeads,
        activeProjects: overview.activeProjects,
        completedProjects: overview.completedProjects,
        publishedBlogs: overview.publishedBlogs,
        totalServices: overview.totalServices,
      },
      statusDistribution: statusCounts,
      monthlyLeads,
      recentLeads,
      recentProjects,
      recentActivity,
    });
  } catch (err) {
    console.error('Overview stats error:', err);
    return NextResponse.json(
      { error: 'Failed to load overview data.' },
      { status: 500 }
    );
  }
}
