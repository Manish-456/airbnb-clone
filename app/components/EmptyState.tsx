"use client";

import { useRouter } from 'next/navigation';
import React from 'react'
import Heading from './Heading';
import Button from './Button';

interface EmptyStateProps {
    title? : string,
    subtitle? : string,
    showReset? : boolean;
}

export default function EmptyState({
    title = "No exact Matches",
    subtitle = "Try changing or removing some of your filters",
    showReset

} : EmptyStateProps) {
    const router = useRouter();
  return (

    <div className='h-[60vh] flex flex-col justify-center items-center gap-2'>
        <Heading 
        center
        title={title}
        subtitle={subtitle}
        />
            <div className="w-52 mt-4">
                {showReset && (
                    <Button 
                    label='Remove all filters'
                    outline
                    onClick={() => router.push("/")}
                    />
                )}
            </div>
    </div>
  )
}
