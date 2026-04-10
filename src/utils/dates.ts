export interface ContentDateValue {
	value: Date;
	hasExplicitTime: boolean;
}

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
