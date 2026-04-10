import fs from 'node:fs';
import path from 'node:path';

export interface ContentDateValue {
	value: Date;
	hasExplicitTime: boolean;
}

const frontmatterCache = new Map<string, string>();

const getFrontmatterSource = (filePath: string) => {
	const cached = frontmatterCache.get(filePath);
	if (cached) return cached;

	const absolutePath = path.resolve(process.cwd(), filePath);
	const source = fs.readFileSync(absolutePath, 'utf8');
	const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	const frontmatter = match?.[1] ?? '';
	frontmatterCache.set(filePath, frontmatter);
	return frontmatter;
};

export const hasExplicitTimeInSource = (filePath: string | undefined, fieldName: 'pubDate' | 'updatedDate') => {
	if (!filePath) return undefined;
	const frontmatter = getFrontmatterSource(filePath);
	const fieldPattern = new RegExp(`^${fieldName}:\\s*(.+)$`, 'm');
	const match = frontmatter.match(fieldPattern);
	if (!match) return undefined;

	const normalized = match[1].trim().replace(/^['"]|['"]$/g, '');
	return /\d{1,2}:\d{2}/.test(normalized);
};

export const parseContentDate = (input: string | Date): ContentDateValue => {
	if (input instanceof Date) {
		const isYamlDateOnly =
			input.getUTCHours() === 0 &&
			input.getUTCMinutes() === 0 &&
			input.getUTCSeconds() === 0 &&
			input.getUTCMilliseconds() === 0;

		if (isYamlDateOnly) {
			return {
				value: new Date(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate()),
				hasExplicitTime: false,
			};
		}

		return {
			value: input,
			hasExplicitTime: true,
		};
	}

	const normalized = input.trim();
	const hasExplicitTime = /\d{1,2}:\d{2}/.test(normalized);
	const value = hasExplicitTime ? new Date(normalized) : new Date(`${normalized}T00:00:00`);

	return {
		value,
		hasExplicitTime,
	};
};

export const resolveContentDate = (
	date: ContentDateValue,
	filePath: string | undefined,
	fieldName: 'pubDate' | 'updatedDate',
): ContentDateValue => {
	const hasExplicitTimeFromSource = hasExplicitTimeInSource(filePath, fieldName);
	if (hasExplicitTimeFromSource === undefined) return date;

	if (!hasExplicitTimeFromSource) {
		return {
			value: new Date(date.value.getUTCFullYear(), date.value.getUTCMonth(), date.value.getUTCDate()),
			hasExplicitTime: false,
		};
	}

	return {
		value: date.value,
		hasExplicitTime: true,
	};
};

export const getComparableTime = (date: ContentDateValue) => date.value.valueOf();

export const formatMonthDay = (date: ContentDateValue) =>
	date.value.toLocaleDateString('zh-CN', {
		month: '2-digit',
		day: '2-digit',
	});

export const formatTime = (date: ContentDateValue) =>
	date.value.toLocaleTimeString('zh-CN', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	});

export const formatMonthDayTime = (date: ContentDateValue) =>
	date.hasExplicitTime ? `${formatMonthDay(date)} ${formatTime(date)}` : formatMonthDay(date);

export const formatFullDate = (date: ContentDateValue, showTime = false) =>
	date.value.toLocaleString('zh-CN', {
		year: 'numeric',
		month: '2-digit',
		day: 'numeric',
		...(showTime && date.hasExplicitTime
			? {
					hour: '2-digit',
					minute: '2-digit',
					hour12: false,
				}
			: {}),
	});
