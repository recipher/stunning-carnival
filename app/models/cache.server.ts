import arc from "@architect/functions";

export async function getCacheByKey(pk: string): Promise<string | null> {
  const db = await arc.tables();
  const result = await db.cache.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": pk },
  });

  const [record] = result.Items;
  if (record) return record.data;
  return null;
}

export async function createCache(pk: string, data: string): Promise<string> {
  const db = await arc.tables();
  await db.cache.put({ pk, data });
  return data;
}

export async function deleteCache(pk: string) {
  const db = await arc.tables();
  await db.cache.delete({ pk });
}
