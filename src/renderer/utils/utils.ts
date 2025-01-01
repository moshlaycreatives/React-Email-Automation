const isArray = (items: any) => Array.isArray(items);

function csvToJson(csvString: any) {
  // Split the CSV string into rows
  const rows = csvString.split('\n');

  // Extract the headers (first row)
  const headers = rows[0].split(',');

  // Process the remaining rows
  const jsonArray = rows
    .slice(1)
    .map((row: any) => {
      const values = row.split(',');
      const jsonObject: any = {};

      // Map headers to values
      headers.forEach((header: any, index: number) => {
        jsonObject[header.trim()] = values[index]?.trim();
      });

      return jsonObject;
    })
    .filter((row: any) => Object.keys(row).some((key) => row[key])); // Remove empty rows

  return jsonArray;
}

export { isArray, csvToJson };
