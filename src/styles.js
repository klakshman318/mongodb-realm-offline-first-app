import { StyleSheet } from 'react-native';

const row = {
    flexDirection: 'row',
    alignItems: 'center'
};

const listItemContainer = {
  alignItems: 'center',
  backgroundColor: '#fff',
  flexDirection: 'row'
};

const listItemSubContainer = {
  alignItems: 'center',
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: '#e0e0e0',
  flex: 1,
  flexDirection: 'row',
  paddingVertical: 12
};

export default StyleSheet.create({

    /** commonLayoutStyles **/
    hSpace1: {paddingLeft: 3},
    hSpace2: {paddingLeft: 6},
    hSpace3: {paddingLeft: 12},
    hSpace4: {paddingLeft: 18},

    vSpace1: {paddingTop: 3},
    vSpace2: {paddingTop: 6},
    vSpace3: {paddingTop: 12},
    vSpace4: {paddingTop: 18},

    full: {
        flex: 1
    },

    row,

    /*--- Main Items List Start ---*/
    listBaseContainer: {
      flex: 1,
      backgroundColor: '#eee'
    },
    listContainer: {
        height: '100%'
    },
    listItemSubContainer,

    listItemData: {
        flex: 1
    },
    listItemTitle: {
        fontSize: 16,
        fontWeight: '700'
    },
    listItemTitle2: {
        fontSize: 14
    },
    listItemDescription: {
        fontSize: 12
    },

    /*--- Items List Start ---*/
    listItemContainer: {
        ...listItemContainer,
        paddingLeft: 12,
        backgroundColor: '#fff'
    },


    /*--- Ripple Items List Start ---*/
    listItemRippleContainer: {
        ...listItemContainer
    },
    listItemRippleSubContainer: {
        ...listItemSubContainer,
        paddingVertical: 12,
        minHeight: 64,
        paddingRight: 54,
    },
    listItemRipple: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        paddingLeft: 12
    },
    listItemRippleOptionsContainer: {
        position: 'absolute',
        right: 3,
        top: 6
    },
});