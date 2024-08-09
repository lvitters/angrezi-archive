import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const radioAngrezi: CustomThemeConfig = {
    name: 'radio-angrezi',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
		"--theme-font-family-heading": `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "var(--color-tertiary-50)",
		"--theme-rounded-base": "0px",
		"--theme-rounded-container": "2px",
		"--theme-border-base": "2px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "255 255 255",
		"--on-secondary": "0 0 0",
		"--on-tertiary": "0 0 0",
		"--on-success": "255 255 255",
		"--on-warning": "0 0 0",
		"--on-error": "0 0 0",
		"--on-surface": "0 0 0",
		// =~= Theme Colors  =~=
		// primary | #000000 
		"--color-primary-50": "217 217 217", // #d9d9d9
		"--color-primary-100": "204 204 204", // #cccccc
		"--color-primary-200": "191 191 191", // #bfbfbf
		"--color-primary-300": "153 153 153", // #999999
		"--color-primary-400": "77 77 77", // #4d4d4d
		"--color-primary-500": "0 0 0", // #000000
		"--color-primary-600": "0 0 0", // #000000
		"--color-primary-700": "0 0 0", // #000000
		"--color-primary-800": "0 0 0", // #000000
		"--color-primary-900": "0 0 0", // #000000
		// secondary | #4F46E5 
		"--color-secondary-50": "229 227 251", // #e5e3fb
		"--color-secondary-100": "220 218 250", // #dcdafa
		"--color-secondary-200": "211 209 249", // #d3d1f9
		"--color-secondary-300": "185 181 245", // #b9b5f5
		"--color-secondary-400": "132 126 237", // #847eed
		"--color-secondary-500": "79 70 229", // #4F46E5
		"--color-secondary-600": "71 63 206", // #473fce
		"--color-secondary-700": "59 53 172", // #3b35ac
		"--color-secondary-800": "47 42 137", // #2f2a89
		"--color-secondary-900": "39 34 112", // #272270
		// tertiary | #ff0000 
		"--color-tertiary-50": "255 217 217", // #ffd9d9
		"--color-tertiary-100": "255 204 204", // #ffcccc
		"--color-tertiary-200": "255 191 191", // #ffbfbf
		"--color-tertiary-300": "255 153 153", // #ff9999
		"--color-tertiary-400": "255 77 77", // #ff4d4d
		"--color-tertiary-500": "255 0 0", // #ff0000
		"--color-tertiary-600": "230 0 0", // #e60000
		"--color-tertiary-700": "191 0 0", // #bf0000
		"--color-tertiary-800": "153 0 0", // #990000
		"--color-tertiary-900": "125 0 0", // #7d0000
		// success | #00ff00 
		"--color-success-50": "217 255 217", // #d9ffd9
		"--color-success-100": "204 255 204", // #ccffcc
		"--color-success-200": "191 255 191", // #bfffbf
		"--color-success-300": "153 255 153", // #99ff99
		"--color-success-400": "77 255 77", // #4dff4d
		"--color-success-500": "0 255 0", // #00ff00
		"--color-success-600": "0 230 0", // #00e600
		"--color-success-700": "0 191 0", // #00bf00
		"--color-success-800": "0 153 0", // #009900
		"--color-success-900": "0 125 0", // #007d00
		// warning | #0000ff 
		"--color-warning-50": "217 217 255", // #d9d9ff
		"--color-warning-100": "204 204 255", // #ccccff
		"--color-warning-200": "191 191 255", // #bfbfff
		"--color-warning-300": "153 153 255", // #9999ff
		"--color-warning-400": "77 77 255", // #4d4dff
		"--color-warning-500": "0 0 255", // #0000ff
		"--color-warning-600": "0 0 230", // #0000e6
		"--color-warning-700": "0 0 191", // #0000bf
		"--color-warning-800": "0 0 153", // #000099
		"--color-warning-900": "0 0 125", // #00007d
		// error | #ff00ff 
		"--color-error-50": "255 217 255", // #ffd9ff
		"--color-error-100": "255 204 255", // #ffccff
		"--color-error-200": "255 191 255", // #ffbfff
		"--color-error-300": "255 153 255", // #ff99ff
		"--color-error-400": "255 77 255", // #ff4dff
		"--color-error-500": "255 0 255", // #ff00ff
		"--color-error-600": "230 0 230", // #e600e6
		"--color-error-700": "191 0 191", // #bf00bf
		"--color-error-800": "153 0 153", // #990099
		"--color-error-900": "125 0 125", // #7d007d
		// surface | #ffff00 
		"--color-surface-50": "255 255 217", // #ffffd9
		"--color-surface-100": "255 255 204", // #ffffcc
		"--color-surface-200": "255 255 191", // #ffffbf
		"--color-surface-300": "255 255 153", // #ffff99
		"--color-surface-400": "255 255 77", // #ffff4d
		"--color-surface-500": "255 255 0", // #ffff00
		"--color-surface-600": "230 230 0", // #e6e600
		"--color-surface-700": "191 191 0", // #bfbf00
		"--color-surface-800": "153 153 0", // #999900
		"--color-surface-900": "125 125 0", // #7d7d00
		
	}
}