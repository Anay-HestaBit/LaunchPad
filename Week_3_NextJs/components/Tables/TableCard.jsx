export default function TableCard({ columns, data }) {
  const gridTemplate = `3fr ${'1fr '.repeat(columns.length - 1)}`;

  return (
    <div className="mt-3">
      <div
        className="grid gap-x-10 border-b border-gray-300 pb-3 text-gray-400"
        style={{ gridTemplateColumns: gridTemplate }}
      >
        {columns.map((col) => (
          <span
            key={col}
            className={`uppercase  text-xs font-semibold ${
              col === 'Actions' ? 'text-right' : ''
            }`}
          >
            {col !== 'Actions' ? col : ''}
          </span>
        ))}
      </div>

      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid gap-x-10 text-[#2D3748] font-semibold ml-5 mt-3 border-b border-[#E2E8F0] pb-3 items-center"
          style={{ gridTemplateColumns: gridTemplate }}
        >
          {columns.map((col) => {
            const cell = row[col];
            if (!cell) return null;

            if (cell.type === 'text') {
              return <span key={col}>{cell.value}</span>;
            }

            if (cell.type === 'image-text') {
              const isLogo = cell.value.variant === 'logo';

              return (
                <div key={col} className="flex items-center gap-3">
                  <img
                    src={cell.value.image}
                    alt=""
                    className={
                      isLogo
                        ? 'w-8 h-8 object-contain'
                        : 'w-10 h-10 rounded-full'
                    }
                  />
                  <div className="flex flex-col">
                    <span className="text-black font-semibold">
                      {cell.value.title}
                    </span>
                    {cell.value.subtitle && (
                      <span className="text-sm text-gray-400">
                        {cell.value.subtitle}
                      </span>
                    )}
                  </div>
                </div>
              );
            }

            if (cell.type === 'badge') {
              const isOnline = cell.value === 'Online';
              return (
                <span
                  key={col}
                  className={`px-3 py-1 rounded-full text-sm font-semibold w-fit ${
                    isOnline
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  {cell.value}
                </span>
              );
            }

            if (cell.type === 'progress') {
              return (
                <div key={col} className="w-full">
                  <span className="text-md text-teal-400">{cell.value}%</span>
                  <div className="h-1 bg-white rounded mt-1">
                    <div
                      className="h-1 bg-teal-400 rounded"
                      style={{ width: `${cell.value}%` }}
                    />
                  </div>
                </div>
              );
            }

            if (cell.type === 'action') {
              if (cell.value === 'dots') {
                return (
                  <button
                    key={col}
                    className="justify-self-end text-gray-400 hover:text-black"
                    aria-label="row actions"
                  >
                    <span className="text-xl leading-none">⋮</span>
                  </button>
                );
              }

              if (cell.value === 'Edit') {
                return (
                  <button
                    key={col}
                    className="justify-self-end text-sm font-semibold text-gray-500 hover:text-black"
                  >
                    Edit
                  </button>
                );
              }
            }

            return null;
          })}
        </div>
      ))}
    </div>
  );
}
