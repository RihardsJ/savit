import Airtable from 'airtable';

interface Content {
  [key: string]: string;
}

interface Credentials {
  [key: string]: string;
}

function getTable(tableName: string) {
  Airtable.configure({
    apiKey:
      import.meta.env.AIRTABLE_TOKEN || import.meta.env.PUBLIC_AIRTABLE_TOKEN,
  });
  const base = Airtable.base(
    import.meta.env.AIRTABLE_BASE_ID || import.meta.env.PUBLIC_AIRTABLE_BASE_ID
  );
  const table = base(tableName);

  return table;
}

function parsePageNameToId(name: string): string {
  const pages: { [key: string]: string } = {
    home: 'recnm7j1xNyr6Sgd2',
    quote: 'recn87SuVd6OtxlCz',
    termsAndConditions: 'recNVaw1AWiJt5rK2',
    404: 'rec1yhFwIeCEHMdfO',
  };

  return pages[name];
}

async function getContent(pageName: string): Promise<Content> {
  const table = getTable('content');
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
  const table = getTable('credentials');
  const fields: Credentials = {};

  try {
    const records = await table.select().all();
    if (records && !!records.length) {
      records.forEach((record) => {
        if (
          record &&
          record.fields &&
          typeof record.fields.key == 'string' &&
          typeof record.fields.value == 'string'
        )
          fields[record.fields.key] = record.fields.value;
      });
    }
  } catch (err) {
    console.log(err);
  }

  return fields;
}

async function getOrders(): Promise<Date[]> {
  const table = getTable('orders');
  const orders: Date[] = [];

  try {
    const records = await table
      .select({
        filterByFormula: "OR(status = 'confirmed', status = 'block')",
      })
      .all();
    if (records && !!records.length) {
      records.forEach((record) => {
        if (
          record &&
          record.fields &&
          record.fields.date &&
          typeof record.fields.date == 'string'
        )
          orders.push(new Date(record.fields.date));
      });
    }
  } catch (err) {
    console.log(err);
  }

  console.log(orders);
  return orders;
}

interface SendQuoteRequestParams {
  [key: string]: string;
}

async function sendQuoteRequest(payload: SendQuoteRequestParams) {
  let response = null;
  const table = getTable('orders');

  try {
    response = table.create([{ fields: payload }]);
  } catch (err) {
    console.log(err);
  }

  return response;
}

export { getContent, getCredentials, getOrders, sendQuoteRequest };
