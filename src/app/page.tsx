import { ApiEndpointsCard } from '@/components/dashboard/api-endpoints-card';
import { BackendStatusCard } from '@/components/dashboard/backend-status-card';
import { RegisterUserCard } from '@/components/dashboard/register-user-card';
import { UserListCard } from '@/components/dashboard/user-list-card';

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold font-headline text-foreground">SweetLearn Frontend</h1>
          <p className="text-muted-foreground mt-1">A dashboard to monitor and manage your backend.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-1 flex flex-col gap-6">
                <BackendStatusCard />
                <ApiEndpointsCard />
            </div>
            <div className="lg:col-span-2 flex flex-col gap-6">
                <RegisterUserCard />
                <UserListCard />
            </div>
        </div>
      </div>
    </main>
  );
}
