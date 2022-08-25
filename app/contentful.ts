import { createClient } from "contentful";

const accessToken = process.env.CONTENTFUL_API_KEY as string;
const space = process.env.CONTENTFUL_SPACE_ID as string;
const environment = process.env.CONTENTFUL_ENV as string;

export default () => createClient({ accessToken, space, environment });
