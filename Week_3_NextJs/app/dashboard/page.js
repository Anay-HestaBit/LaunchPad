import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-8">
        <Card
          title="Today's Money"
          value="$53,000"
          right={<img className="w-16 h-14" src="/icons/money.png" />}
        >
          <Badge text="+55%" color="green" />
        </Card>

        <Card
          title="Today's Users"
          value="2,300"
          right={<img className="w-16 h-14" src="/icons/users.png" />}
        >
          <Badge text="+5%" color="green" />
        </Card>

        <Card
          title="New Clients"
          value="+3,052"
          right={<img className="w-16 h-14" src="/icons/clients.png" />}
        >
          <Badge text="-14%" color="red" />
        </Card>

        <Card
          title="Total Sales"
          value="$173,000"
          right={<img className="w-16 h-14" src="/icons/sales.png" />}
        >
          <Badge text="+8%" color="green" />
        </Card>
      </div>
      <div className='grid grid-cols-2 gap-8'>
        <Card>
  <div className="flex items-center justify-between gap-6">
    
    {/* Left content */}
    <div className="flex flex-col max-w-md">
      <span className="text-sm text-gray-400">
        Built by developers
      </span>

      <h2 className="text-xl font-bold text-gray-800 mt-1">
        Purity UI Dashboard
      </h2>

      <p className="text-sm text-gray-500 mt-2">
        From colors, cards, typography to complex elements,
        you will find the full documentation.
      </p>

      <button className="flex items-center gap-1 text-sm font-medium text-gray-700 mt-4">
        Read more →
      </button>
    </div>

    {/* Right media */}
    <div className="flex items-center justify-center w-64 h-36 rounded-xl bg-teal-400">
      <span className="text-white text-2xl font-semibold">
        chakra
      </span>
    </div>
  </div>
</Card>

      </div>
      
    </div>
  );
}

/* Small stat block */
function Stat({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  );
}
