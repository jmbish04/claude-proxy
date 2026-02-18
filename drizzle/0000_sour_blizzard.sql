CREATE TABLE `request_trace` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`request_id` text NOT NULL,
	`timestamp` integer DEFAULT (unixepoch()) NOT NULL,
	`method` text NOT NULL,
	`url` text NOT NULL,
	`path` text NOT NULL,
	`request_headers` text NOT NULL,
	`request_body` text,
	`claude_model` text,
	`target_model` text,
	`target_base_url` text,
	`response_status` integer,
	`response_headers` text,
	`response_body` text,
	`duration_ms` integer,
	`is_streaming` integer DEFAULT false,
	`error_message` text,
	`input_tokens` integer,
	`output_tokens` integer,
	`client_ip` text,
	`user_agent` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `request_trace_request_id_unique` ON `request_trace` (`request_id`);