'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const SAMPLE_LOGOS = [
  {
    id: 1,
    companyName: 'TechFlow',
    style: 'Minimal',
    primaryColor: '#2563EB',
    backgroundColor: '#FFFFFF',
    imageUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=400&fit=crop',
    createdAt: '2024-03-20T10:30:00Z'
  },
  {
    id: 2,
    companyName: 'GreenLeaf',
    style: 'Organic',
    primaryColor: '#059669',
    backgroundColor: '#F0FDF4',
    imageUrl: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=400&h=400&fit=crop',
    createdAt: '2024-03-19T15:45:00Z'
  }
];

export default function History() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-semibold text-slate-800">Recent Logos</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_LOGOS.map((logo) => (
            <Card key={logo.id}>
              <CardContent className="p-4">
                <div className="aspect-square rounded-lg border-2 border-dashed border-slate-200 p-4 mb-4">
                  <img
                    src={logo.imageUrl}
                    alt={`${logo.companyName} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-slate-800">{logo.companyName}</h3>
                  <div className="flex gap-2 text-sm text-slate-500">
                    <span>{logo.style}</span>
                    <span>•</span>
                    <span>{new Date(logo.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <div
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: logo.primaryColor }}
                      title="Primary Color"
                    />
                    <div
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: logo.backgroundColor }}
                      title="Background Color"
                    />
                  </div>
                  <Button
                    onClick={() => window.open(logo.imageUrl, '_blank')}
                    variant="outline"
                    className="w-full mt-2"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}