require("dotenv").config();

const contentful = require("contentful-management");

const accessToken = process.env.CONTENTFUL_MANAGEMENT_API_KEY;
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const environment = process.env.CONTENTFUL_ENV;

module.exports = async (_) => {
  const client = contentful.createClient({ accessToken });
  const space = await client.getSpace(spaceId);
  return space.getEnvironment(environment);
};
