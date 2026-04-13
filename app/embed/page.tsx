import EmbedClient from '@/components/EmbedClient';
import { getSession } from '@/lib/getSession';
import React from 'react';

const Page = async () => {
  const session = await getSession();
  
  // Safe fallback to prevent passing undefined to the client component
  const ownerId = session?.user?.id || "";

  return (
    <>
      {ownerId ? (
        <EmbedClient ownerId={ownerId} />
      ) : (
        <p>Please log in to view your embed code.</p>
      )}
    </>
  );
}

export default Page;