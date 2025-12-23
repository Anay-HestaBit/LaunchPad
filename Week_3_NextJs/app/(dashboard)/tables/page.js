import ListCard from '@/components/Tables/ListCard';
import { userData } from '@/components/data/Tables/autherdata.js';
import { data } from '@/components/data/Tables/projectsdata.js';
const columns = [
  'Companies',
  'Budget',
  'Status',
  'Completion',
  'Actions',
];
 const userColumns = [
  "Author",
  "Function",
  "Status",
  "Employed",
  "Actions"
];

export default function TablesPage() {
  return (
    <div>
      <ListCard
      title={"Authors Table"}
      columns={userColumns}
      data={userData}
      >

      </ListCard>
      <ListCard
        title="Projects"
        subtitle={'30 done this month'}
        columns={columns}
        data={data}
      />
    </div>
  );
}
