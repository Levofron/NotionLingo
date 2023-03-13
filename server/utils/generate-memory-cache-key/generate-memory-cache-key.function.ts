export const generateMemoryCacheKey = (
  userId: string,
  notionDatabaseId: string,
  notionApiKey: string,
) => {
  const cacheKeyObject = {
    userId,
    notionApiKey,
    notionDatabaseId,
  };

  return JSON.stringify(cacheKeyObject);
};
