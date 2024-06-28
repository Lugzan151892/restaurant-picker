import { EISSUE_PRIORITY, EISSUE_STATUS } from '@/views/issues/interfaces';

export const getIssueStatusText = (status: EISSUE_STATUS) => {
	switch (status) {
		case EISSUE_STATUS.WAITING:
			return 'Создана, в ожидании';
		case EISSUE_STATUS.IN_PROGRESS:
			return 'В работе';
		case EISSUE_STATUS.COMPLETED:
			return 'Выполнена';
		default:
			return '';
	}
};

export const getIssuePriorityText = (priority: EISSUE_PRIORITY) => {
	switch (priority) {
		case EISSUE_PRIORITY.URGENT:
			return 'Неотложный';
		case EISSUE_PRIORITY.DEFAULT:
			return 'Обычный';
		case EISSUE_PRIORITY.UNIMPORTANT:
			return 'Низкий';
		default:
			return '';
	}
};

export const getIssueStatusColors = (status: EISSUE_STATUS) => {
	switch (status) {
		case EISSUE_STATUS.WAITING:
			return 'var(--main-error)';
		case EISSUE_STATUS.IN_PROGRESS:
			return 'var(--main-warning)';
		case EISSUE_STATUS.COMPLETED:
			return 'var(--main-success)';
		default:
			return '';
	}
};

export const getIssuePriorityColors = (status: EISSUE_PRIORITY) => {
	switch (status) {
		case EISSUE_PRIORITY.URGENT:
			return 'var(--main-error)';
		case EISSUE_PRIORITY.DEFAULT:
			return 'var(--main-warning)';
		case EISSUE_PRIORITY.UNIMPORTANT:
			return 'var(--main-success)';
		default:
			return '';
	}
};
