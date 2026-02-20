import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

/**
 * Request/Response traceability table for D1
 * Tracks all incoming requests and outgoing responses
 */
export const requestTrace = sqliteTable('request_trace', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  // Request information
  requestId: text('request_id').notNull().unique(),
  timestamp: integer('timestamp', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  method: text('method').notNull(),
  url: text('url').notNull(),
  path: text('path').notNull(),

  // Request headers and body
  requestHeaders: text('request_headers').notNull(), // JSON string
  requestBody: text('request_body'), // JSON string

  // Model and API information
  claudeModel: text('claude_model'),
  targetModel: text('target_model'),
  targetBaseUrl: text('target_base_url'),

  // Response information
  responseStatus: integer('response_status'),
  responseHeaders: text('response_headers'), // JSON string
  responseBody: text('response_body'), // JSON string

  // Timing and metadata
  durationMs: integer('duration_ms'),
  isStreaming: integer('is_streaming', { mode: 'boolean' }).default(false),
  errorMessage: text('error_message'),

  // Token usage (extracted from response)
  inputTokens: integer('input_tokens'),
  outputTokens: integer('output_tokens'),

  // Additional metadata
  clientIp: text('client_ip'),
  userAgent: text('user_agent'),
});

export type RequestTrace = typeof requestTrace.$inferSelect;
export type NewRequestTrace = typeof requestTrace.$inferInsert;
