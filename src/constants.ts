export const ADAPTIVE_CARDS_DOCS = `
{
	"$schema": "https://raw.githubusercontent.com/microsoft/AdaptiveCards/6f39aedce45864ae1067ed44a5551dc973790bb5/source/nodejs/typed-schema/schema/lib/Type.json",
	"description": "Represents a cell within a row of a Table element.",
	"version": "1.5",
		"properties": {
		"items": {
			"type": "Element[]",
			"description": "The card elements to render inside the \`TableCell\`.",
			"required": true
		},
		"selectAction": {
			"type": "ISelectAction",
			"description": "An Action that will be invoked when the \`TableCell\` is tapped or selected. \`Action.ShowCard\` is not supported.",
			"version": "1.1"
		},
		"style": {
			"type": "ContainerStyle?",
			"description": "Style hint for \`TableCell\`."
		},
		"verticalContentAlignment": {
			"type": "VerticalContentAlignment?",
			"description": "Defines how the content should be aligned vertically within the container. When not specified, the value of verticalContentAlignment is inherited from the parent container. If no parent container has verticalContentAlignment set, it defaults to Top.",
			"version": "1.1"
		},
		"bleed": {
			"type": "boolean",
			"description": "Determines whether the element should bleed through its parent's padding.",
			"version": "1.2",
			"features": [
				2109
			]
		},
		"backgroundImage": {
			"type": "BackgroundImage",
			"description": "Specifies the background image. Acceptable formats are PNG, JPEG, and GIF",
			"version": "1.2",
			"shorthands": [
				{
					"type": "uri-reference",
					"description": "The URL (or data url) to use as the background image. Supports data URI."
				}
			]
		},
		"minHeight": {
			"type": "string",
			"description": "Specifies the minimum height of the container in pixels, like \`\"80px\"\`.",
			"examples": [
				"50px"
			],
			"version": "1.2",
			"features": [
				2293
			]
		},
		"rtl?": {
			"type": "boolean?",
			"description": "When \`true\` content in this container should be presented right to left. When 'false' content in this container should be presented left to right. When unset layout direction will inherit from parent container or column. If unset in all ancestors, the default platform behavior will apply.",
			"version": "1.5"
		}
	}
}

{
	"$schema": "https://raw.githubusercontent.com/microsoft/AdaptiveCards/6f39aedce45864ae1067ed44a5551dc973790bb5/source/nodejs/typed-schema/schema/lib/Type.json",
	"extends": "Element",
	"description": "Displays an image. Acceptable formats are PNG, JPEG, and GIF",
	"properties": {
		"url": {
			"type": "uri-reference",
			"description": "The URL to the image. Supports data URI in version 1.2+",
			"required": true
		},
		"altText": {
			"type": "string",
			"description": "Alternate text describing the image."
		},
		"backgroundColor": {
			"type": "string",
			"description": "Applies a background to a transparent image. This property will respect the image style.",
			"example": "#DDDDDD",
			"version": "1.1"
		},
		"height": {
			"type": "string|BlockElementHeight",
			"description": "The desired height of the image. If specified as a pixel value, ending in 'px', E.g., 50px, the image will distort to fit that exact height. This overrides the \`size\` property.",
			"examples": [
				"50px"
			],
			"default": "auto",
			"override": true,
			"version": "1.1"
		},
		"horizontalAlignment": {
			"type": "HorizontalAlignment?",
			"description": "Controls how this element is horizontally positioned within its parent. When not specified, the value of horizontalAlignment is inherited from the parent container. If no parent container has horizontalAlignment set, it defaults to Left."
		},
		"selectAction": {
			"type": "ISelectAction",
			"description": "An Action that will be invoked when the \`Image\` is tapped or selected. \`Action.ShowCard\` is not supported.",
			"version": "1.1"
		},
		"size": {
			"type": "ImageSize",
			"description": "Controls the approximate size of the image. The physical dimensions will vary per host."
		},
		"style": {
			"type": "ImageStyle",
			"description": "Controls how this \`Image\` is displayed."
		},
		"width": {
			"type": "string",
			"description": "The desired on-screen width of the image, ending in 'px'. E.g., 50px. This overrides the \`size\` property.",
			"examples": [
				"50px"
			],
			"version": "1.1"
		}
	}
}

{
	"$schema": "https://raw.githubusercontent.com/microsoft/AdaptiveCards/6f39aedce45864ae1067ed44a5551dc973790bb5/source/nodejs/typed-schema/schema/lib/Type.json",
	"extends": "Element",
	"description": "Defines an array of inlines, allowing for inline text formatting.",
	"version": "1.2",
	"features": [
		1933
	],
	"properties": {
		"inlines": {
			"type": "Inline[]",
			"description": "The array of inlines.",
			"required": true
		},
		"horizontalAlignment": {
			"type": "HorizontalAlignment?",
			"description": "Controls the horizontal text alignment. When not specified, the value of horizontalAlignment is inherited from the parent container. If no parent container has horizontalAlignment set, it defaults to Left."
		}
	}
}

{
	"$schema": "https://raw.githubusercontent.com/microsoft/AdaptiveCards/6f39aedce45864ae1067ed44a5551dc973790bb5/source/nodejs/typed-schema/schema/lib/Type.json",
	"extends": "Element",
	"description": "Containers group items together.",
	"properties": {
		"items": {
			"type": "Element[]",
			"description": "The card elements to render inside the \`Container\`.",
			"required": true
		},
		"selectAction": {
			"type": "ISelectAction",
			"description": "An Action that will be invoked when the \`Container\` is tapped or selected. \`Action.ShowCard\` is not supported.",
			"version": "1.1"
		},
		"style": {
			"type": "ContainerStyle?",
			"description": "Style hint for \`Container\`."
		},
		"verticalContentAlignment": {
			"type": "VerticalContentAlignment?",
			"description": "Defines how the content should be aligned vertically within the container. When not specified, the value of verticalContentAlignment is inherited from the parent container. If no parent container has verticalContentAlignment set, it defaults to Top.",
			"version": "1.1"
		},
		"bleed": {
			"type": "boolean",
			"description": "Determines whether the element should bleed through its parent's padding.",
			"version": "1.2",
			"features": [
				2109
			]
		},
		"backgroundImage": {
			"type": "BackgroundImage",
			"description": "Specifies the background image. Acceptable formats are PNG, JPEG, and GIF",
			"version": "1.2",
			"shorthands": [
				{
					"type": "uri-reference",
					"description": "The URL (or data url) to use as the background image. Supports data URI."
				}
			]
		},
		"minHeight": {
			"type": "string",
			"description": "Specifies the minimum height of the container in pixels, like \`\"80px\"\`.",
			"examples": [
				"50px"
			],
			"version": "1.2",
			"features": [
				2293
			]
		},
		"rtl?": {
			"type": "boolean?",
			"description": "When \`true\` content in this container should be presented right to left. When 'false' content in this container should be presented left to right. When unset layout direction will inherit from parent container or column. If unset in all ancestors, the default platform behavior will apply.",
			"version": "1.5"
		}
	}
}

{
	"$schema": "https://raw.githubusercontent.com/microsoft/AdaptiveCards/6f39aedce45864ae1067ed44a5551dc973790bb5/source/nodejs/typed-schema/schema/lib/Type.json",
	"extends": "Element",
	"description": "Provides a way to display data in a tabular form.",
	"version": "1.5",
	"properties": {
		"columns": {
			"type": "TableColumnDefinition[]",
			"description": "Defines the number of columns in the table, their sizes, and more."
		},
		"rows": {
			"type": "TableRow[]",
			"description": "Defines the rows of the table."
		},
		"firstRowAsHeader": {
			"type": "boolean",
			"description": "Specifies whether the first row of the table should be treated as a header row, and be announced as such by accessibility software.",
			"default": true
		},
		"showGridLines": {
			"type": "boolean",
			"description": "Specifies whether grid lines should be displayed.",
			"default": true
		},
		"gridStyle": {
			"type": "ContainerStyle?",
			"description": "Defines the style of the grid. This property currently only controls the grid's color.",
			"default": "default"
		},
		"horizontalCellContentAlignment": {
			"type": "HorizontalAlignment?",
			"description": "Controls how the content of all cells is horizontally aligned by default. When not specified, horizontal alignment is defined on a per-cell basis."
		},
		"verticalCellContentAlignment": {
			"type": "VerticalAlignment?",
			"description": "Controls how the content of all cells is vertically aligned by default. When not specified, vertical alignment is defined on a per-cell basis."
		}
	}
}

{
	"$schema": "https://raw.githubusercontent.com/microsoft/AdaptiveCards/6f39aedce45864ae1067ed44a5551dc973790bb5/source/nodejs/typed-schema/schema/lib/Type.json",
	"extends": "ToggleableItem",
	"description": "Defines a container that is part of a ColumnSet.",
	"properties": {
		"items": {
			"type": "Element[]",
			"description": "The card elements to render inside the \`Column\`."
		},
		"backgroundImage": {
			"type": "BackgroundImage",
			"description": "Specifies the background image. Acceptable formats are PNG, JPEG, and GIF",
			"version": "1.2",
			"shorthands": [
				{
					"type": "uri-reference",
					"description": "The URL (or data url) to use as the background image. Supports data URI."
				}
			]
		},
		"bleed": {
			"type": "boolean",
			"description": "Determines whether the column should bleed through its parent's padding.",
			"version": "1.2",
			"features": [
				2109
			]
		},
		"fallback": {
			"type": "Column|FallbackOption",
			"description": "Describes what to do when an unknown item is encountered or the requires of this or any children can't be met.",
			"version": "1.2"
		},
		"minHeight": {
			"type": "string",
			"description": "Specifies the minimum height of the column in pixels, like \`\"80px\"\`.",
			"examples": [
				"50px"
			],
			"version": "1.2",
			"features": [
				2293
			]
		},
		"rtl": {
			"type": "boolean?",
			"description": "When \`true\` content in this column should be presented right to left. When 'false' content in this column should be presented left to right. When unset layout direction will inherit from parent container or column. If unset in all ancestors, the default platform behavior will apply.",
			"version": "1.5"
		},
		"separator": {
			"type": "boolean",
			"description": "When \`true\`, draw a separating line between this column and the previous column."
		},
		"spacing": {
			"type": "Spacing",
			"description": "Controls the amount of spacing between this column and the preceding column."
		},
		"selectAction": {
			"type": "ISelectAction",
			"description": "An Action that will be invoked when the \`Column\` is tapped or selected. \`Action.ShowCard\` is not supported.",
			"version": "1.1"
		},
		"style": {
			"type": "ContainerStyle?",
			"description": "Style hint for \`Column\`."
		},
		"verticalContentAlignment": {
			"type": "VerticalContentAlignment?",
			"description": "Defines how the content should be aligned vertically within the column. When not specified, the value of verticalContentAlignment is inherited from the parent container. If no parent container has verticalContentAlignment set, it defaults to Top.",
			"version": "1.1"
		},
		"width": {
			"type": "string|number",
			"description": "\`\"auto\"\`, \`\"stretch\"\`, a number representing relative width of the column in the column group, or in version 1.1 and higher, a specific pixel width, like \`\"50px\"\`."
		}
	}
}



`
