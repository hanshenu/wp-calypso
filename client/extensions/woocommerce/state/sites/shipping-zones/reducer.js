/**
 * External dependencies
 */
import { findIndex, isArray } from 'lodash';

/**
 * Internal dependencies
 */
import { createReducer } from 'state/utils';
import { LOADING } from 'woocommerce/state/constants';
import {
	WOOCOMMERCE_SHIPPING_ZONE_DELETED,
	WOOCOMMERCE_SHIPPING_ZONE_METHODS_REQUEST,
	WOOCOMMERCE_SHIPPING_ZONE_METHODS_REQUEST_SUCCESS,
	WOOCOMMERCE_SHIPPING_ZONE_UPDATED,
	WOOCOMMERCE_SHIPPING_ZONES_REQUEST,
	WOOCOMMERCE_SHIPPING_ZONES_REQUEST_SUCCESS,
} from 'woocommerce/state/action-types';

// TODO: Handle error

export default createReducer( null, {
	[ WOOCOMMERCE_SHIPPING_ZONE_METHODS_REQUEST ]: ( state, { zoneId } ) => {
		if ( ! isArray( state ) ) {
			return state;
		}
		const zoneIndex = findIndex( state, { id: zoneId } );
		if ( -1 === zoneIndex ) {
			return state;
		}

		const zone = { ...state[ zoneIndex ],
			methodIds: LOADING,
		};
		return [
			...state.slice( 0, zoneIndex ),
			zone,
			...state.slice( zoneIndex + 1 ),
		];
	},

	[ WOOCOMMERCE_SHIPPING_ZONE_METHODS_REQUEST_SUCCESS ]: ( state, { zoneId, data } ) => {
		if ( ! isArray( state ) ) {
			return state;
		}
		const zoneIndex = findIndex( state, { id: zoneId } );
		if ( -1 === zoneIndex ) {
			return state;
		}

		const zone = { ...state[ zoneIndex ],
			methodIds: data.map( method => method.id ),
		};

		return [
			...state.slice( 0, zoneIndex ),
			zone,
			...state.slice( zoneIndex + 1 ),
		];
	},

	[ WOOCOMMERCE_SHIPPING_ZONE_UPDATED ]: ( state, { data, originatingAction: { zone } } ) => {
		if ( ! isArray( state ) ) {
			return state;
		}

		if ( 'number' !== typeof zone.id ) {
			return [ ...state,
				{ ...data,
					methodIds: [],
				}
			];
		}

		const zoneIndex = findIndex( state, { id: zone.id } );
		if ( -1 === zoneIndex ) {
			return state;
		}

		return [
			...state.slice( 0, zoneIndex ),
			{ ...data,
				methodIds: state[ zoneIndex ].methodIds,
			},
			...state.slice( zoneIndex + 1 ),
		];
	},

	[ WOOCOMMERCE_SHIPPING_ZONE_DELETED ]: ( state, { originatingAction: { zone } } ) => {
		if ( ! isArray( state ) ) {
			return state;
		}

		const zoneIndex = findIndex( state, { id: zone.id } );
		if ( -1 === zoneIndex ) {
			return state;
		}

		return [
			...state.slice( 0, zoneIndex ),
			...state.slice( zoneIndex + 1 ),
		];
	},

	[ WOOCOMMERCE_SHIPPING_ZONES_REQUEST ]: () => {
		return LOADING;
	},

	[ WOOCOMMERCE_SHIPPING_ZONES_REQUEST_SUCCESS ]: ( state, { data } ) => {
		return data;
	},
} );
