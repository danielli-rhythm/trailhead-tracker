import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'node:crypto';
import { docClient, TABLE_NAME } from '../lib/dynamoClient.mjs';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
};

export const handler = async (event) => {
  let input;
  try {
    input = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  if (!input.name) return { statusCode: 400, headers, body: JSON.stringify({ error: 'name is required' }) };

  const now = new Date().toISOString();
  const item = {
    id: randomUUID(),
    name: input.name,
    type: input.type || 'module',
    url: input.url || null,
    status: input.status || 'not_started',
    priority: input.priority || null,
    priorityLabel: input.priorityLabel || null,
    points: input.points || null,
    estimatedMinutes: input.estimatedMinutes || null,
    startedAt: input.startedAt || null,
    completedAt: input.completedAt || null,
    notes: input.notes || null,
    createdAt: now,
    updatedAt: now,
  };

  try {
    await docClient.send(new PutCommand({ TableName: TABLE_NAME, Item: item }));
    return { statusCode: 201, headers, body: JSON.stringify(item) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
