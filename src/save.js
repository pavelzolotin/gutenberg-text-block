import {
	useBlockProps,
	RichText,
	getColorClassName,
} from '@wordpress/block-editor';
import classnames from 'classnames';

export default function save({ attributes }) {
	const {
		text,
		textAlignment,
		backgroundColor,
		textColor,
		customBackgroundColor,
		customTextColor,
		shadow,
		shadowOpacity,
	} = attributes;

	const backgroundClass = getColorClassName(
		'background-color',
		backgroundColor
	);

	const textClass = getColorClassName('color', textColor);

	const classes = classnames(`text-block-align-${textAlignment}`, {
		'has-shadow': shadow,
		[`shadow-opacity-${shadowOpacity}`]: shadow && shadowOpacity,
		[textClass]: textClass,
		[backgroundClass]: backgroundClass,
	});

	return (
		<RichText.Content
			{...useBlockProps.save({
				className: classes,
				style: {
					backgroundColor: backgroundClass
						? undefined
						: customBackgroundColor,
					color: textClass ? undefined : customTextColor,
				},
			})}
			tagName="p"
			value={text}
		/>
	);
}
