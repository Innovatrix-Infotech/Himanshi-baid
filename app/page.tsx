export default function Home() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-slate-50 px-6'>
      <section className='w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-10 shadow-sm'>
        <h1 className='text-3xl font-semibold tracking-tight text-slate-900'>
          Himanshi-baid
        </h1>
        <p className='mt-3 text-base text-slate-600'>
          Next.js app initialized and ready to consume content from Directus.
        </p>
        <p className='mt-6 text-sm text-slate-500'>
          Configure environment values in <code>.env.local</code> based on{' '}
          <code>.env.example</code>.
        </p>
      </section>
    </main>
  )
}
