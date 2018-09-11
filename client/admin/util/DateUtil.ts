export const DateUtil = {
    formatFromString: (date: string): string => {
        return new Date(date).toISOString().split('T')[0];
    },

    actualFormatDate: (): string => {
        return DateUtil.formatFromString(new Date().toISOString());
    },
};
