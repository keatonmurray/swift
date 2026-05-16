/**
 * DataTable
 * ---------
 * Reusable card-wrapped table for dashboard pages.
 * Follows DESIGN.md: rounded-lg (20px), hairline-light border, no shadow.
 */
const DataTable = ({
  title,
  action,
  columns = [],
  rows = [],
  getRowKey = (_row, i) => i,
  className = "",
  empty,
}) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-[20px] p-6 overflow-hidden ${className}`}
    >
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h3 className="text-[14px] font-semibold text-gray-900">{title}</h3>
          )}
          {action}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left pb-3 pr-4 text-[11px] font-semibold uppercase tracking-wider text-gray-400"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && empty ? (
            <tr>
              <td colSpan={columns.length} className="py-8 text-center">
                {empty}
              </td>
            </tr>
          ) : (
            rows.map((row, rowIdx) => (
              <tr
                key={getRowKey(row, rowIdx)}
                className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
              >
                {columns.map((col) => {
                  const value = col.render
                    ? col.render(row, rowIdx)
                    : typeof col.accessor === "function"
                    ? col.accessor(row)
                    : row[col.accessor]

                  const cls =
                    typeof col.cellClassName === "function"
                      ? col.cellClassName(row)
                      : col.cellClassName ?? ""

                  return (
                    <td
                      key={col.key}
                      className={`py-3 pr-4 text-[13px] ${cls}`}
                    >
                      {value}
                    </td>
                  )
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default DataTable
