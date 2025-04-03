interface sizeSchema {
	size: string;
}

declare namespace JSX {
	interface IntrinsicElements {
		"my-precious": React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLElement>,
			HTMLElement
		>;
		"login-sign": React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLElement, sizeSchema>,
			HTMLElement
		>;
	}
}
