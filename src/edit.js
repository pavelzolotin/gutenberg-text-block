import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	PanelColorSettings,
	ContrastChecker,
	withColors,
} from '@wordpress/block-editor';
import {
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalBoxControl as BoxControl,
	PanelBody,
	RangeControl,
} from '@wordpress/components';
import classnames from 'classnames';
import './editor.scss';

const { __Visualizer: BoxControlVisualizer } = BoxControl;

function Edit(props) {
	const {
		attributes,
		setAttributes,
		backgroundColor,
		textColor,
		setBackgroundColor,
		setTextColor,
	} = props;
	const { text, textAlignment, style, shadow, shadowOpacity } = attributes;

	const onChangeAlignment = (newAlignment) => {
		setAttributes({ textAlignment: newAlignment });
	};
	const onChangeText = (newText) => {
		setAttributes({ text: newText });
	};

	const onChangeShadowOpacity = (newShadowOpacity) => {
		setAttributes({ shadowOpacity: newShadowOpacity });
	};

	const toggleShadow = () => {
		setAttributes({ shadow: !shadow });
	};

	const classes = classnames(`text-block-align-${textAlignment}`, {
		'has-shadow': shadow,
		[`shadow-opacity-${shadowOpacity}`]: shadow && shadowOpacity,
	});

	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={__('Color Settings', 'text-block')}
					icon="admin-appearance"
					initialOpen
					disableCustomColors={false}
					colorSettings={[
						{
							value: backgroundColor.color,
							onChange: setBackgroundColor,
							label: __('Background Color', 'text-block'),
						},
						{
							value: textColor.color,
							onChange: setTextColor,
							label: __('Text Color', 'text-block'),
						},
					]}
				>
					<ContrastChecker
						textColor={textColor.color}
						backgroundColor={backgroundColor.color}
					/>
					{shadow && (
						<PanelBody title={__('Shadow Setting', 'text-block')}>
							<RangeControl
								label={__('Shadow Opacity', 'text-block')}
								value={shadowOpacity}
								min={10}
								max={40}
								step={10}
								onChange={onChangeShadowOpacity}
							/>
						</PanelBody>
					)}
				</PanelColorSettings>
			</InspectorControls>
			<BlockControls
				controls={[
					{
						icon: 'admin-page',
						title: __('Shadow', 'text-block'),
						onClick: toggleShadow,
						isActive: shadow,
					},
				]}
			>
				<AlignmentToolbar
					value={textAlignment}
					onChange={onChangeAlignment}
				/>
			</BlockControls>
			<div
				{...useBlockProps({
					className: classes,
					style: {
						backgroundColor: backgroundColor.color,
						color: textColor.color,
					},
				})}
			>
				<RichText
					className="text-block-paragraph"
					onChange={onChangeText}
					value={text}
					placeholder={__('Your Text', 'text-block')}
					tagName="p"
					allowedFormats={[]}
				/>
				<BoxControlVisualizer
					values={style && style.spacing && style.spacing.padding}
					showValues={
						style && style.visualizers && style.visualizers.padding
					}
				/>
			</div>
		</>
	);
}

export default withColors({
	backgroundColor: 'backgroundColor',
	textColor: 'color',
})(Edit);
