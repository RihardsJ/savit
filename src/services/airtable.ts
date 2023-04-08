import Airtable from "airtable";

interface Content {
  [key: string]: string;
}

interface Credentials {
  [key: string]: string;
}

function getTable(tableName: string) {
  Airtable.configure({
    apiKey: import.meta.env.AIRTABLE_TOKEN,
  });
  const base = Airtable.base(import.meta.env.AIRTABLE_BASE_ID);
  const table = base(tableName);

  return table;
}

function parsePageNameToId(name: string): string {
  const pages: { [key: string]: string } = {
    home: "rectl3gyPcfBv8zXG",
    quote: "reczqsp0N4o9QUcSw",
    termsAndConditions: "recmHMCGhMU8LWJyE",
    404: "recTciXyoKAAzUhDa",
  };

  return pages[name];
}

async function getContent(pageName: string): Promise<Content> {
  const table = getTable("content");
  let fields = {};

  try {
    const records = await table.find(parsePageNameToId(pageName));
    if (records && records.fields) {
      fields = records.fields;
    }
  } catch (err) {
    console.log(err);
  }

  return fields;
}

async function getCredentials(): Promise<Credentials> {
  const table = getTable("credentials");
  const fields: Credentials = {};

  try {
    const records = await table.select().all();
    if (records && !!records.length) {
      records.forEach((record) => {
        if (
          record &&
          record.fields &&
          typeof record.fields.key == "string" &&
          typeof record.fields.value == "string"
        )
          fields[record.fields.key] = record.fields.value;
      });
    }
  } catch (err) {
    console.log(err);
  }

  return fields;
}

export { getContent, getCredentials };
