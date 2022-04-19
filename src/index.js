import { registerBlockType, createBlock } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';

registerBlockType('block-test/text-block', {
	edit: Edit,
	save,
	transforms: {
		from: [
			{
				type: 'block',
				blocks: ['core/heading'],
				transform: ({ content, align }) => {
					return createBlock('block-test/text-block', {
						text: content,
						textAlignment: align,
					});
				},
			},
			{
				type: 'enter',
				regExp: /textblock/i,
				transform: () => {
					return createBlock('block-test/text-block', {
						shadow: true,
					});
				},
			},
			{
				type: 'prefix',
				prefix: 'textblock',
				transform: () => {
					return createBlock('block-test/text-block');
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: ['core/heading'],
				isMatch: ({ text }) => {
					return text ? true : false;
				},
				transform: ({ text, textAlignment }) => {
					return createBlock('core/heading', {
						content: text,
						align: textAlignment,
					});
				},
			},
		],
	},
});
