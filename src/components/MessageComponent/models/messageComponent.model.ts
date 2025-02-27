export interface CustomMessageProps {
	severity: 'success' | 'info' | 'warn' | 'error' | undefined;
	message: string;
}
export interface MessageComponentProps extends CustomMessageProps {
	onClose?: () => void;
}
