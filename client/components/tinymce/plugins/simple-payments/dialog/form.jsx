/* eslint-disable wpcalypso/jsx-classname-namespace */

/**
 * External dependencies
 */
import React, { Component } from 'react';
import { localize } from 'i18n-calypso';
import Gridicon from 'gridicons';

/**
 * Internal dependencies
 */
import FormFieldset from 'components/forms/form-fieldset';
import FormLabel from 'components/forms/form-label';
import FormTextInput from 'components/forms/form-text-input';
import FormTextarea from 'components/forms/form-textarea';
import FormSettingExplanation from 'components/forms/form-setting-explanation';
import FormCurrencyInput from 'components/forms/form-currency-input';
import FormToggle from 'components/forms/form-toggle';
import FormInputValidation from 'components/forms/form-input-validation';

const ProductImage = () =>
	<div className="editor-simple-payments-modal__product-image">
		<Gridicon icon="add-image" size={ 36 } />
	</div>;

class ProductForm extends Component {
	handleFieldChange = ( { currentTarget: { name, value } } ) => {
		this.props.onFieldChange( name, value );
	};

	handleMultipleCheckboxChange = checked => {
		this.props.onFieldChange( 'multiple', checked );
	};

	render() {
		const { translate, currencyDefaults, fieldValues, isFieldInvalid } = this.props;

		const isTitleInvalid = isFieldInvalid( 'title' );
		const isPriceInvalid = isFieldInvalid( 'price' );
		const isEmailInvalid = isFieldInvalid( 'email' );

		return (
			<form className="editor-simple-payments-modal__form">
				<ProductImage />
				<div className="editor-simple-payments-modal__form-fields">
					<FormFieldset>
						<FormLabel htmlFor="title">
							{ translate( 'What are you selling?' ) }
						</FormLabel>
						<FormTextInput
							name="title"
							id="title"
							value={ fieldValues.title }
							onChange={ this.handleFieldChange }
							isError={ isTitleInvalid }
						/>
						{ isTitleInvalid &&
							<FormInputValidation
								isError
								text={ translate( 'Product name cannot be empty.' ) }
							/> }
					</FormFieldset>
					<FormFieldset>
						<FormLabel htmlFor="description">
							{ translate( 'Description' ) }
						</FormLabel>
						<FormTextarea
							name="description"
							id="description"
							value={ fieldValues.description }
							onChange={ this.handleFieldChange }
						/>
					</FormFieldset>
					<FormFieldset>
						<FormLabel htmlFor="price">
							{ translate( 'Price' ) }
						</FormLabel>
						<FormCurrencyInput
							name="price"
							id="price"
							currencySymbolPrefix={ currencyDefaults.symbol }
							placeholder="0.00"
							value={ fieldValues.price }
							onChange={ this.handleFieldChange }
							isError={ isPriceInvalid }
						/>
						{ isPriceInvalid &&
							<FormInputValidation isError text={ translate( 'Invalid price' ) } /> }
					</FormFieldset>
					<FormFieldset>
						<FormToggle
							name="multiple"
							id="multiple"
							checked={ !! fieldValues.multiple }
							onChange={ this.handleMultipleCheckboxChange }
						>
							{ translate( 'Allow people to buy more than one item at a time.' ) }
						</FormToggle>
					</FormFieldset>
					<FormFieldset>
						<FormLabel htmlFor="email">
							{ translate( 'Email' ) }
						</FormLabel>
						<FormTextInput
							name="email"
							id="email"
							value={ fieldValues.email }
							onChange={ this.handleFieldChange }
							isError={ isEmailInvalid }
						/>
						{ isEmailInvalid &&
							<FormInputValidation isError text={ translate( 'Invalid email' ) } /> }
						<FormSettingExplanation>
							{ translate(
								'This is where PayPal will send your money.' +
									" To claim a payment, you'll need a PayPal account connected to a bank account.",
							) }
						</FormSettingExplanation>
					</FormFieldset>
				</div>
			</form>
		);
	}
}

export default localize( ProductForm );
