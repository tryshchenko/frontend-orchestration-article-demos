// This is example of non-reusable TableComponent. It's done for sake of time saving. Please never do it in real life

const COLUMNS = [
  "userId",
  "username",
  "email",
  "birthdate",
  "registeredAt",
  "company",
  "balance",
  "jobTitle",
  "jobArea",
  "jobType",
  "animal",
  "vehicle",
  "color",
  "department",
  "music",
];

export default function DataTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          {COLUMNS.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.userId}>
            {COLUMNS.map((column) => (
              <td key={column}>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
