'use client';

import React from 'react';
import DocumentForm from '@/components/admin/DocumentForm';

export default function NewOrderPage() {
  return (
    <div className="min-h-screen bg-[#121212]">
      {/* We reuse the form, setting mode to 'order' */}
      <DocumentForm mode="order" documentId="S00075" />
    </div>
  );
}