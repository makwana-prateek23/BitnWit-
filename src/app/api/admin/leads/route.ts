import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookieName, verifySessionToken } from '@/lib/db/auth';
import { store } from '@/lib/db/store';
import { LeadStatus } from '@/lib/db/types';

export async function GET(req: NextRequest) {
  try {
    const cookieName = getSessionCookieName();
    const token = req.cookies.get(cookieName)?.value;
    const session = token ? verifySessionToken(token) : null;
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || undefined;
    const status = (searchParams.get('status') as LeadStatus) || undefined;
    const service = searchParams.get('service') || undefined;
    const isExport = searchParams.get('export') === 'csv';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = isExport ? 10000 : parseInt(searchParams.get('limit') || '20', 10);

    const result = await store.getLeads({
      status,
      service,
      search,
      page,
      limit,
    });

    // Handle CSV export request
    if (isExport) {
      const headers = [
        'ID',
        'Full Name',
        'Email',
        'Phone',
        'Company',
        'Service',
        'Budget',
        'Status',
        'Source',
        'Date Received',
        'Assigned To',
        'Follow Up Date',
        'Notes Count',
      ];

      const rows = result.items.map((lead) => [
        `"${lead.id}"`,
        `"${(lead.fullName || '').replace(/"/g, '""')}"`,
        `"${(lead.email || '').replace(/"/g, '""')}"`,
        `"${(lead.phone || '').replace(/"/g, '""')}"`,
        `"${(lead.companyName || '').replace(/"/g, '""')}"`,
        `"${(lead.interestedService || '').replace(/"/g, '""')}"`,
        `"${(lead.projectBudget || '').replace(/"/g, '""')}"`,
        `"${lead.status}"`,
        `"${lead.leadSource}"`,
        `"${lead.dateReceived}"`,
        `"${(lead.assignedTeamMember || '').replace(/"/g, '""')}"`,
        `"${lead.followUpDate || ''}"`,
        `"${(lead.notes || []).length}"`,
      ]);

      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="bitnwit-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      items: result.items,
      totalCount: result.totalCount,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    });
  } catch (err) {
    console.error('Leads GET error:', err);
    return NextResponse.json({ error: 'Failed to retrieve leads.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const cookieName = getSessionCookieName();
    const token = req.cookies.get(cookieName)?.value;
    const session = token ? verifySessionToken(token) : null;
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    if (!body.fullName || (!body.email && !body.phone)) {
      return NextResponse.json(
        { error: 'Lead full name and at least email or phone are required.' },
        { status: 400 }
      );
    }

    const newLead = await store.createLead({
      fullName: body.fullName.trim(),
      email: (body.email || '').trim().toLowerCase(),
      phone: (body.phone || '').trim(),
      companyName: (body.companyName || '').trim(),
      interestedService: body.interestedService || 'General Inquiry',
      projectBudget: body.projectBudget || 'Not specified',
      message: body.message || '',
      leadSource: body.leadSource || 'MANUAL',
      status: body.status || 'NEW',
      assignedTeamMember: body.assignedTeamMember || undefined,
      followUpDate: body.followUpDate || undefined,
    });

    await store.logActivity(
      session.userId,
      session.name,
      'LEAD_CREATE',
      'LEAD',
      newLead.id,
      `Manually created lead for ${newLead.fullName}`
    );

    return NextResponse.json({ success: true, lead: newLead });
  } catch (err) {
    console.error('Lead POST error:', err);
    return NextResponse.json({ error: 'Failed to create lead.' }, { status: 500 });
  }
}
