import { subMonths, startOfToday, startOfWeek, startOfMonth } from "date-fns";

export function calculateFilter(filter: string): Date {
	switch (filter) {
		case "last 3 months":
			return subMonths(new Date(), 3);
		case "last month":
			return subMonths(startOfMonth(new Date()), 1);
		case "last week":
			return startOfWeek(new Date());
		case "last day":
			return startOfToday();
		case "all time":
		default:
			return new Date(0);
	}
}

export function getSorter(sorter: string) {
	switch (sorter) {
		case "speed":
			return "speed";
		case "raw speed":
			return "rawSpeed";
		case "accuracy":
			return "accuracy";
		case "date":
		default:
			return "createdAt";
	}
}
