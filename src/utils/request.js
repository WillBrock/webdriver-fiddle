import { graphql_endpoint } from '../../config';
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(graphql_endpoint, { headers : {} });

export default client;
